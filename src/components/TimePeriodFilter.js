import React from 'react'

import Filter from './Filter'
import FilterField from './FilterField'

const debouncedHandleChange = () => {}

const minYear = 1960
const maxYear = 2015

const TimePeriodFilter = ({ from, to }) => (
  <div id='time-period' className='mb3'>
    <div className='mb2 pb-tiny h5 caps bold border-bottom'>
      Time period
    </div>
    <div className='clearfix'>
      <label htmlFor='time-from'>Time from</label>
      <input
        className='block col-6 field'
        type='number'
        id='time-from'
        min={minYear}
        max={maxYear}
        value={from}
      />
      <label htmlFor='time-to'>Time to</label>
      <input
        className='block col-6 field'
        type='number'
        id='time-to'
        min={minYear}
        max={maxYear}
      />
    </div>
  </div>
)

export default TimePeriodFilter
