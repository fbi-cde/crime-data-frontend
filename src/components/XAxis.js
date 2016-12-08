import React from 'react'

const XAxis = ({
  tickCt = 8,
  tickSizeOuter = 6,
  height,
  scale,
}) => {
  const range = scale.range()
  const [range0, range1, k] = [range[0] + 0.5, range[range.length - 1] + 0.5, 1]
  const domain = `M${range0},${k * tickSizeOuter}V0.5H${range1}V${k * tickSizeOuter}`

  const format = scale.tickFormat ? scale.tickFormat.apply(scale) : x => x
  const values = scale.ticks(tickCt)
  const ticks = values.map((v, i) => {
    const pos = scale(v)

    return (
      <g key={i} transform={`translate(${pos}, 0)`} className='tick'>
        <line stroke='#000' x1='0.5' x2='0.5' y2='6' />
        <text fill='#000' x='0.5' y='9' dy='.71em'>{format(v)}</text>
      </g>
    )
  })

  return (
    <g className='axis' transform={`translate(0, ${height})`} textAnchor='middle'>
      <path className='domain' stroke='#000' d={domain} />
      {ticks}
    </g>
  )
}

export default XAxis
