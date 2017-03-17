import React from 'react'


const Hint = ({ value, position }) => {
  const width = String(value).length * 10
  const style = {
    left: position.x - (width / 2),
    top: position.y + 20,
  }

  return (
    <div
      className='
        inline absolute border-box bg-black white
        p1 h6 bold line-height-1 center rounded'
      style={style}
    >
      {value}
    </div>
  )
}

export default Hint
