import React from 'react'
import startCase from 'lodash.startcase'

import Loading from './Loading'
import NoData from './NoData'
import TrendChart from './TrendChart'
import TrendSourceText from './TrendSourceText'

const TrendContainer = ({ crime, place, filters, data, dispatch, loading, keys }) => {
  const { since, until } = filters

  let content = null
  if (loading) content = <Loading />
  else if (!data || data.length === 0) content = <NoData />
  else {
    content = (
      <TrendChart
        crime={crime}
        data={data}
        dispatch={dispatch}
        keys={keys}
        place={place}
        since={since}
        until={until}
      />
    )
  }

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
          {startCase(crime)} rate in {startCase(place)},{' '}
          <br className='xs-hide' />
          {since}–{until}
        </h2>
      </div>
      <div className='mb2'>{content}</div>
      {!loading && (
        <TrendSourceText
          dispatch={dispatch}
          place={place}
          since={since}
          until={until}
        />
      )}
    </div>
  )
}

export default TrendContainer
