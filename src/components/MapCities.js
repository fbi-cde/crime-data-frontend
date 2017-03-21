import React from 'react'


const MapCities = ({ cities, projection, strokeWidth }) => (
  <g>
    {cities.map((c, i) => (
      <circle
        key={i}
        fill='#ff5e50'
        r={strokeWidth * 3}
        transform={`translate(${projection(c.geometry.coordinates)})`}
      />
    ))}
  </g>
)

export default MapCities
