import React from 'react'
import startCase from 'lodash.startcase'

import Loading from './Loading'
import NibrsCard from './NibrsCard'
import parseNibrs from '../util/nibrs'

const NibrsContainer = ({ crime, place, filters, data }) => {
  const { timeFrom, timeTo } = filters

  let content = <Loading />
  if (data) {
    const dataParsed = parseNibrs(data)
    content = (
      <div className='clearfix mb8 mxn1'>
        {dataParsed.map((d, i) => (
          <div key={i} className='lg-col lg-col-6 mb2 px1'>
            <NibrsCard {...d} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
          {startCase(crime)} Incident Details in {startCase(place)},
          <br />
          {timeFrom}–{timeTo}
        </h2>
      </div>
      {content}
    </div>
  )
}

export default NibrsContainer
