import React from 'react'

import Histogram from './Histogram'

const NibrsHistogram = ({ data, title }) => (
  <div className='mb2 pb2 border-bottom'>
    <div className='mb1 bold'>{title}</div>
    <Histogram data={data} />
  </div>
)

export default NibrsHistogram
