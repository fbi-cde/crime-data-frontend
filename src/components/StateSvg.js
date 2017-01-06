import { geoPath } from 'd3-geo'
import React from 'react'
import { feature } from 'topojson'

import stateIcons from '../../data/state-icons.json'

const StateSvg = ({
  state = 'va',
  size = 64,
  color = '#95aabc',
}) => {
  const path = geoPath().projection(null)
  const datum = stateIcons[state]
  const geo = feature(datum, datum.objects.icon)

  return (
    <svg width={size} height={size} fill={color} viewBox='0 0 100 100'>
      <path d={path(geo)} />
    </svg>
  )
}

export default StateSvg
