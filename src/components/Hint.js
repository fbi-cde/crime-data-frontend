import React from 'react'

const Hint = ({ data, position }) => {
  const { value } = data
  const width = 20 + (String(value).length * 10)
  const style = {
    left: position.x - (width / 2),
    top: position.y + 10,
    width,
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
