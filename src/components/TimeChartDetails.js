import React from 'react'

const TimeChartDetails = ({ data }) => {
  const year = data ? data.date.getFullYear() : '...'

  return (
    <div className='mb1 p2 bg-light-blue clearfix'>
      <div className='mb1 monospace bold underline inline-block active-year'>{year}</div>
      <p className='m0 md-col-10 lg-col-8 h5'>
        Ohio’s incident rate surpasses that of the United States, and in {year} was
        35.3 incidents per 100,000 people (legacy definition).
      </p>
    </div>
  )
}

export default TimeChartDetails
