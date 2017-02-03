import React from 'react'

import NibrsCard from './NibrsCard'
import parseNibrs from '../util/nibrs'

const NibrsCards = ({ data }) => {
  const dataParsed = parseNibrs(data)

  return (
    <div className='clearfix mb8 mxn1'>
      {dataParsed.map((d, i) => (
        <div key={i} className='lg-col lg-col-6 mb2 px1'>
          <NibrsCard {...d} />
        </div>
      ))}
    </div>
  )
}

export default NibrsCards
