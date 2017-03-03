import React from 'react'
import startCase from 'lodash.startcase'

import Loading from './Loading'
import NoData from './NoData'
import TrendChart from './TrendChart'
import TrendSourceText from './TrendSourceText'

const TrendContainer = ({ crime, place, filters, data, dispatch, loading, keys }) => {
  const { timeFrom, timeTo } = filters

  let content = null
  if (loading) content = <Loading />
  else if (!data || data.length === 0) content = <NoData />
  else {
    content = (
      <TrendChart
        crime={crime}
        data={data}
        dispatch={dispatch}
        filters={filters}
        keys={keys}
        place={place}
      />
    )
  }

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
          {startCase(crime)} rate in {startCase(place)},{' '}
          <br className='xs-hide' />
          {timeFrom}–{timeTo}
        </h2>
      </div>
      <div className='mb2'>{content}</div>
      {!loading && (
        <TrendSourceText dispatch={dispatch} filters={filters} place={place} />
      )}
    </div>
  )
}

export default TrendContainer
