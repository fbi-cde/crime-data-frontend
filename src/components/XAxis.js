import React from 'react'


const XAxis = ({
  tickCt = 8,
  tickSizeOuter = 6,
  height,
  scale,
  showLine = false,
}) => {
  const range = scale.range()
  const [range0, range1, k] = [range[0] + 0.5, range[range.length - 1] + 0.5, 1]
  const domain = `M${range0},${k * tickSizeOuter}V0.5H${range1}V${k * tickSizeOuter}`

  const format = scale.tickFormat ? scale.tickFormat.apply(scale) : x => String(x)
  const values = scale.ticks ? scale.ticks(tickCt) : scale.domain()

  const ticks = values.map((v, i) => {
    let pos = scale(v)

    if (scale.bandwidth) {
      let offset = scale.bandwidth() / 2
      if (scale.round()) offset = Math.round(offset)
      pos += offset
    }

    return (
      <g key={i} transform={`translate(${pos}, 0)`} className='tick'>
        <line stroke='#000' y2='6' />
        <text fill='#000' x='0' y='9' dy='.71em'>{format(v)}</text>
      </g>
    )
  })

  return (
    <g className='axis axis--x' transform={`translate(0, ${height})`} textAnchor='middle'>
      {showLine && <path className='domain' d={domain} stroke='#000' />}
      {ticks}
    </g>
  )
}

export default XAxis
