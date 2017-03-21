import React from 'react'


const MapCounties = ({ counties, path, strokeWidth }) => (
  <g>
    {counties.map((c, i) => (
      <path
        key={i}
        d={path(c)}
        fill='none'
        stroke='#fff'
        strokeWidth={`${strokeWidth / 3}px`}
      />
    ))}
  </g>
)

export default MapCounties
