import React from 'react'
import startCase from 'lodash.startcase'

import DownloadDataBtn from './DownloadDataBtn'
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
      <TrendChart crime={crime} data={data} dispatch={dispatch} keys={keys} />
    )
  }

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <div className='lg-flex items-baseline'>
          <div className='flex-auto'>
            <div className='inline-block'>
              <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
                {startCase(crime)} rate in {startCase(place)},
                <br />
                {timeFrom}–{timeTo}
              </h2>
            </div>
          </div>
          <div>
            <DownloadDataBtn
              data={data}
              fname={`${place}-${crime}-${timeFrom}–${timeTo}`}
              text='Download data'
            />
          </div>
        </div>
      </div>
      <div className='mb2'>{content}</div>
      {!loading && (
        <TrendSourceText dispatch={dispatch} filters={filters} place={place} />
      )}
    </div>
  )
}

export default TrendContainer
