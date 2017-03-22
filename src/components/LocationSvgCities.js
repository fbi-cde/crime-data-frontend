import React from 'react'


const LocationSvgCities = ({ cities, projection, strokeWidth }) => (
  <g className='cities'>
    {cities.map((c, i) => (
      <circle
        key={i}
        fill='#284152'
        r={strokeWidth * 3}
        transform={`translate(${projection(c.geometry.coordinates)})`}
      />
    ))}
  </g>
)

export default LocationSvgCities
