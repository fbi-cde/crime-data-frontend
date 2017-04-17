import startCase from 'lodash.startcase'
import React from 'react'

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
      <div className='mb2 p2 sm-p4 bg-white border-top border-blue border-w8'>
        <h2 className='mt0 mb3 fs-24 sm-fs-32 sans-serif'>
          {startCase(crime)} rate in {startCase(place)},{' '}
          <br className='xs-hide' />
          {since}–{until}
        </h2>
        {content}
      </div>
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
