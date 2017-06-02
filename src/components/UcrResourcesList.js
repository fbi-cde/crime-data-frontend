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
    : `participation/states/${lookupUsa(place)}`

  return [
    {
      text: 'Download participation and population data',
      url: `${API}/${path}?output=csv`,
    },
  ]
}

const locationLinks = place => {
  let links
  if (place === nationalKey) {
    links = content.locations.national
  } else {
    links = content.locations.states[startCase(place)] || []
  }
  return links.filter(l => l.text)
}

const UcrResourcesList = ({ place, placeType }) => {
  const links = [
    ...participationCsvLink(place, placeType),
    ...locationLinks(place),
  ]
  return (
    <div>
      <h3 className="mt4 mb1 fs-18">UCR resources</h3>
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
