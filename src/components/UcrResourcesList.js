import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import { API } from '../util/api'
import { lookupStateByName } from '../util/location'

import content from '../util/content'
import { nationalKey } from '../util/usa'

const participationCsvLink = (place, type, states) => {
  if (type === 'agency') return []
  if (type === 'region') return []
  console.log('participationCsvLink handleChange(): Using State ABBR')

  const path =
    place === nationalKey
      ? 'participation/national'
      : `participation/states/${lookupStateByName(states.states, place).state_abbr}`

  return [
    {
      text: 'Download participation and population data',
      url: `${API}/${path}?output=csv`,
    },
  ]
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

const UcrResourcesList = ({ crime, place, placeType, states }) => {
  const links = [
    {
      text: `About ${lowerCase(crime)} data`,
      url: '#about-the-data',
    },
    ...participationCsvLink(place, placeType, states),
    ...locationLinks(place),
  ]

  return (
    <div>
      <h2 className="mt4 mb1 fs-18 sm-fs-22">Resources</h2>
      <ul className="m0 p0 fs-14 left-bars">
        {links.map((l, i) =>
          <li className="mb1" key={i}>
            <a href={l.url}>
              {l.text}
            </a>
          </li>,
        )}
      </ul>
    </div>
  )
}

UcrResourcesList.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  states: PropTypes.object.isRequired,

}

export default UcrResourcesList
