import React from 'react'

import Filter from './Filter'
import { updateFilter } from '../actions/filterActions'

const eventAction = e => updateFilter(e)

const filters = [
  {
    label: 'Crime type',
    type: 'select',
    options: ['Yo', 'Dude', 'Hey'],
  },
  {
    label: 'States',
    type: 'checkbox',
    options: ['AK', 'CA', 'IL', 'NY'],
  },
]

const Sidebar = ({ dispatch }) => (
  <nav className='site-sidebar bg-silver'>
    <div className='p2 sm-p3'>
      <h2 className='mt0'>Sidebar</h2>
    </div>
    { filters.map((f, i) => (
      <Filter
        key={i}
        onChange={e => { dispatch(eventAction(e)) }}
        {...f}
      />
    ))}

  </nav>
)

Sidebar.propTypes = {
  dispatch: React.PropTypes.func,
}

export default Sidebar
