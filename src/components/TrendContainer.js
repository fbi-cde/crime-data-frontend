import { plural } from 'pluralize'
import React from 'react'

import DownloadDataBtn from './DownloadDataBtn'
import Loading from './Loading'
import TrendChart from './TrendChart'

const TrendContainer = ({
  crime, place, filters,
  data, loading, keys,
}) => {
  const { timeFrom, timeTo } = filters
  const chart = (loading || !data) ? <Loading /> : (
    <div className='p4 bg-white'>
      <TrendChart data={data} keys={keys} />
    </div>
  )

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <div className='md-flex items-baseline'>
          <div className='flex-auto'>
            <div className='inline-block'>
              <h2 className='m0 fs-ch1 sans-serif'>
                Reported {plural(crime)} in {place},
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
      <div className='mb8'>{chart}</div>
    </div>
  )
}

export default TrendContainer
