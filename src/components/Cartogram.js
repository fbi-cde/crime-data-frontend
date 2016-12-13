import React from 'react'

import stateGrid from '../../data/usa-states.json'

const [ROWS, COLS] = [8, 12]

const Cartogram = ({
  square = 50,
  cushion = 2,
  color = 'springgreen',
  data,
}) => {
  const inner = square - (2 * cushion)
  const style = {
    cntnr: {
      position: 'relative',
      width: COLS * square,
      height: ROWS * square,
      margin: -cushion,
    },
    sq_outer: {
      position: 'absolute',
      boxSizing: 'border-box',
      width: square,
      height: square,
      padding: cushion,
    },
    sq_inner: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: Math.max(square / 5, 5),
      width: inner,
      height: inner,
      lineHeight: `${inner}px`,
    },
  }

  const states = stateGrid.map(d => {
    const outerStyle = Object.assign({}, style.sq_outer, {
      left: d.grid.x * square,
      top: (d.grid.y - 1) * square,
    })

    const innerStyle = Object.assign({}, style.sq_inner, {
      backgroundColor: data[d.id] ? color : '#eee',
    })

    return (
      <div key={d.id} data-state={d.id} style={outerStyle}>
        <div style={innerStyle}>{d.name_short}</div>
      </div>
    )
  })

  return (
    <div style={style.cntnr}>
      {states}
    </div>
  )
}

export default Cartogram
