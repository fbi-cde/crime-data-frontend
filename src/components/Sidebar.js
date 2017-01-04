import debounce from 'lodash.debounce'
import React from 'react'

import Filter from './Filter'
import FilterField from './FilterField'
import StateSvg from './StateSvg'
import { updateFilter } from '../actions/filterActions'
import { states } from '../util/usa'

const propertyCrime = [
  'All property crime',
  'Burglary',
]

const usaStates = Object.keys(states).map(s => s.toUpperCase())

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
    <nav className='site-sidebar bg-white'>
      <div className='p2 sm-p3'>
        <Filter legend='Location' id='location'>
          <FilterField
            label='State'
            onChange={handleChange}
            options={usaStates}
            type='select'
          />
          <div className='mt2 center'>
            <StateSvg state='dc' color='#274152' size='160' />
          </div>
        </Filter>
        <Filter legend='Time period' id='time-period'>
          <div className='clearfix'>
            <FilterField
              className='col col-5'
              label='Time from'
              onChange={debouncedHandleChange}
              showLabel={false}
              type='number'
            />
            <span className='col col-2 lh-form-field center'>to</span>
            <FilterField
              className='col col-5'
              label='Time to'
              onChange={debouncedHandleChange}
              showLabel={false}
              type='number'
            />
          </div>
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
