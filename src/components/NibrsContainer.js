import React from 'react'
import startCase from 'lodash.startcase'

import Loading from './Loading'
import NibrsCards from './NibrsCards'

const NibrsContainer = ({ crime, place, filters, data, loading }) => {
  const { timeFrom, timeTo } = filters

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <h2 className='m0 fs-ch1 sans-serif'>
          {startCase(crime)} Incident Details in {place},
          <br />
          {timeFrom}–{timeTo}
        </h2>
      </div>
      {(loading || !data) ? <Loading /> : <NibrsCards data={data} />}
    </div>
  )
}

export default NibrsContainer
