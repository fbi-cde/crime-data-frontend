import React from 'react'

const Loading = ({ text }) => (
  <div className='mb8 p4 bg-white'>
    <div className='fs-18 bold red-bright'>{text || 'Loading...'}</div>
  </div>
)

export default Loading
