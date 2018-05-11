import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import FileSaver from 'file-saver'
import Zip from 'jszip'

import { API } from '../util/api'
import { lookupStateByName } from '../util/location'
import jsonToCsv from '../util/csv'
import content from '../util/content'
import { nationalKey } from '../util/usa'

const participationCsvLink = (place, type, states, participation) => {
  if (type === 'agency') return []
  if (type === 'region') return []

  console.log('participationCsvLink:', place, type, states, participation)
  console.log('participation Location:', participation.data[place])

  const clickHander = () => {
    const data = participation.data[place]
    const dirname = `${place}_participation_population_data`
    const zip = new Zip()

    zip.file(`${dirname}/README.md`, `# ${lowerCase(dirname)}\n`)
    const content = jsonToCsv(data)
    console.log('content,', content)
    zip.file(`${dirname}/${dirname}`, content)

    return zip
      .generateAsync({ type: 'blob' })
      .then(content => {
        FileSaver.saveAs(content, `${dirname}.zip`)
      })
      .catch(e => {
        /* eslint-disable */
        console.error('error from zip generation', {
          err: e,
          args: { data, filename, text }
        })
        /* eslint-enable */
      })
  }

  return (
    <li className="mb1" key="participation_dl">
      <a
        id="participationLink"
        className="mb1 cursor-pointer"
        onClick={clickHander}
      >
        Download participation and population data{' '}
      </a>
    </li>
  )
}

const locationLinks = place => {
  const links = []
  if (place !== nationalKey) {
    const more = content.locations.states[startCase(place)]
    if (more) links.push(...more)
  }
  links.push(...content.locations.national)
  return links.filter(l => l.text)
}

const UcrResourcesList = ({
  crime,
  place,
  placeType,
  states,
  participation
}) => {
  const links = [
    {
      text: `About ${lowerCase(crime)} data`,
      url: '#about-the-data'
    },
    ...locationLinks(place)
  ]

  const participationLink = participationCsvLink(
    place,
    placeType,
    states,
    participation
  )

  return (
    <div>
      <h2 className="mt4 mb1 fs-18 sm-fs-22">Resources</h2>
      <ul className="m0 p0 fs-14 left-bars">
        {links.map((l, i) => (
          <li className="mb1" key={i}>
            <a href={l.url}>{l.text}</a>
          </li>
        ))}
        {participationLink}
      </ul>
    </div>
  )
}

UcrResourcesList.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  states: PropTypes.object.isRequired,
  participation: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean
  }).isRequired
}

export default UcrResourcesList
