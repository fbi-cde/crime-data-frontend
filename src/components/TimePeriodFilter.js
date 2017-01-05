import React from 'react'

const minYear = 1960
const maxYear = 2015

const TimePeriodFilter = ({ onChange, timeFrom, timeTo }) => {
  const handleChange = e => {
    const { id, value } = e.target
    onChange({ [id]: value })
  }

  return (
    <div id='time-period' className='mb3'>
      <div className='mb2 pb-tiny h5 caps bold border-bottom'>
        Time period
      </div>
      <div className='clearfix'>
        <label htmlFor='time-from'>Time from</label>
        <input
          className='block col-6 field'
          type='number'
          id='timeFrom'
          min={minYear}
          max={maxYear}
          onChange={handleChange}
          value={timeFrom}
        />
        <label htmlFor='time-to'>Time to</label>
        <input
          className='block col-6 field'
          type='number'
          id='timeTo'
          min={minYear}
          max={maxYear}
          onChange={handleChange}
          value={timeTo}
        />
      </div>
    </div>
  )
}

export default TimePeriodFilter
