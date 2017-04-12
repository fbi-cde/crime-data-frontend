import React from 'react'

const LocationSvgCounties = ({ counties, path, strokeWidth, selected, update }) => {
  const handleClick = county => () => update(county)

  return (
    <g className='counties cursor-pointer'>
      {counties.map((c, i) => {
        const name = c.properties.name
        return (
          <path
            key={i}
            d={path(c)}
            fill={name === selected ? '#ff5e50' : '#95aabc'}
            stroke='#fff'
            strokeWidth={`${strokeWidth / 2}px`}
            onClick={handleClick(name)}
          />
        )
      })}
    </g>
  )
}

export default LocationSvgCounties
