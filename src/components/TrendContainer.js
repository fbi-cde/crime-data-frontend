import lowerCase from 'lodash.lowercase'
import { plural } from 'pluralize'
import React from 'react'
import startCase from 'lodash.startcase'

import DownloadDataBtn from './DownloadDataBtn'
import Loading from './Loading'
import NoData from './NoData'
import Term from './Term'
import TrendChart from './TrendChart'

const TrendContainer = ({
  crime, place, filters, data, dispatch, loading, keys,
}) => {
  const { timeFrom, timeTo } = filters
  const srs = (
    <Term id='summary reporting system (srs)' dispatch={dispatch}>
      Summary (SRS)
    </Term>
  )
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
        <div className='md-flex items-baseline'>
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
              fname='summary data'
              text='Download data'
            />
          </div>
        </div>
      </div>
      <div className='mb2'>{content}</div>
      {!loading && (
      <div className='center italic fs-12 mb8'>
        <p>Source: Reported {srs} data from {startCase(place)}, {timeFrom}–{timeTo}.</p>
      </div>
      )}
    </div>
  )
}

export default TrendContainer
