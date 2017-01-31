import React from 'react'

import Loading from './Loading'
import TimeChart from './TimeChart'

const TrendContainer = ({ loading, data, keys }) => {
  if (loading || !data) return (<Loading text='summary loading' />)

  return (
    <div className='p2 sm-p4 bg-white'>
      <TimeChart data={data} keys={keys} />
    </div>
  )
}

export default TrendContainer
