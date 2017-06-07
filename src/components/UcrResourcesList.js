import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import { API } from '../util/api'
import content from '../util/content'
import lookupUsa, { nationalKey } from '../util/usa'

const participationCsvLink = (place, type) => {
  if (type === 'agency') return []

  const path = place === nationalKey
    ? 'participation/national'
    : `participation/states/${lookupUsa(place).toUpperCase()}`

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
    links.push(...content.locations.states[startCase(place)])
  }
  links.push(...content.locations.national)
  return links.filter(l => l.text)
}

const UcrResourcesList = ({ place, placeType }) => {
  const links = [
    {
      text: 'About the Data',
      url: '#',
    },
    ...participationCsvLink(place, placeType),
    ...locationLinks(place),
  ]

  return (
    <div>
      <h3 className="mt4 mb1 fs-18">Resources</h3>
      <ul className="m0 p0 fs-14 left-bars">
        {links.map((l, i) => (
          <li className="mb1" key={i}>
            <a href={l.url}>{l.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

UcrResourcesList.propTypes = {
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
}

export default UcrResourcesList
