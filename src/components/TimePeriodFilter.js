import React from 'react'

const minYear = 1960
const maxYear = 2015
const yearRange = 10

const TimePeriodFilter = ({ onChange, timeFrom, timeTo }) => {
  const handleChange = e => {
    const { id, value } = e.target

    const isFrom = id === 'timeFrom'
    const otherId = isFrom ? 'timeTo' : 'timeFrom'
    const otherVal = +value + (yearRange * (isFrom ? 1 : -1))

    if (isFrom && otherVal > maxYear) return
    else if (otherVal < minYear) return

    onChange({
      [id]: value,
      [otherId]: String(otherVal),
    })
  }

  return (
    <div id='time-period' className='mb4'>
      <h3 className='mt0 mb2 pb-tiny border-bottom'>Time period</h3>
      <div className='clearfix'>
        <div className='col col-5'>
          <label htmlFor='time-from' className='hide'>Time from</label>
          <input
            className='block col-12 field'
            type='number'
            id='timeFrom'
            min={minYear}
            max={maxYear}
            onChange={handleChange}
            value={timeFrom}
          />
        </div>
        <span className='col col-2 center lh-form-field'>to</span>
        <div className='col col-5'>
          <label htmlFor='time-to' className='hide'>Time to</label>
          <input
            className='block col-12 field'
            type='number'
            id='timeTo'
            min={minYear}
            max={maxYear}
            onChange={handleChange}
            value={timeTo}
          />
        </div>
      </div>
    </div>
  )
}

export default TimePeriodFilter
