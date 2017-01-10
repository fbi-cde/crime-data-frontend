import React from 'react'

const YAxis = ({
  tickCt = 4,
  tickSizeOuter = 6,
  scale,
  width,
}) => {
  const range = scale.range()
  const [range0, range1, k] = [range[0] + 0.5, range[range.length - 1] + 0.5, -1]
  const domain = `M${k * tickSizeOuter},${range0}H0.5V${range1}H${k * tickSizeOuter}`

  const values = scale.ticks(tickCt)
  const ticks = values.map((v, i) => {
    const pos = scale(v)

    return (
      <g key={i} transform={`translate(0, ${pos})`} className='tick'>
        <line stroke='#000' x2={width} y2='0' />
        <text fill='#000' x='-9' y='0' dy='.32em'>{v}</text>
      </g>
    )
  })

  return (
    <g className='axis axis--y' textAnchor='end'>
      <path className='domain display-none' d={domain} />
      {ticks}
    </g>
  )
}

export default YAxis
