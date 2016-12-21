import debounce from 'lodash.debounce'
import React from 'react'

import Filter from './Filter'
import FilterField from './FilterField'
import { updateFilter } from '../actions/filterActions'

const propertyCrime = [
  'All property crime',
  'Burglary',
]

const usStates = ['AZ', 'CA', 'MT', 'NJ', 'PA', 'WV']

const violentCrime = [
  'All violent crime',
  'Murder',
  'Rape',
  'Robbery',
  'Aggravated assult',
]

const Sidebar = ({ dispatch }) => {
  const handleChange = change => dispatch(updateFilter(change))
  const debouncedHandleChange = debounce(handleChange, 800)
  return (
    <nav className='site-sidebar bg-silver'>
      <div className='p2 sm-p3'>
        <h2 className='mt0'>Sidebar</h2>
        <Filter legend='Location' id='location'>
          <FilterField
            label='State'
            onChange={handleChange}
            options={usStates}
            type='select'
          />
        </Filter>
        <Filter legend='Time period' id='time-period'>
          <FilterField
            className='col col-5'
            label='Time from'
            onChange={debouncedHandleChange}
            showLabel={false}
            type='number'
          />
          <span className='align-middle col col-2 center'>to</span>
          <FilterField
            className='col col-5'
            label='Time to'
            onChange={debouncedHandleChange}
            showLabel={false}
            type='number'
          />
        </Filter>
        <Filter legend='Type of crime' id='type-of-crime'>
          <FilterField
            label='Violent crime'
            onChange={handleChange}
            options={violentCrime}
            type='radio'
          />
          <FilterField
            label='Property crime'
            onChange={handleChange}
            options={propertyCrime}
            type='radio'
          />
        </Filter>
      </div>
    </nav>
  )
}

Sidebar.propTypes = {
  dispatch: React.PropTypes.func,
}

export default Sidebar
