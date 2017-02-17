import React from 'react'

import CrimeTypeFilter from './CrimeTypeFilter'
import LocationFilter from './LocationFilter'
import TimePeriodFilter from './TimePeriodFilter'

import { hideSidebar } from '../actions/sidebarActions'

const Sidebar = ({ dispatch, filters, isOpen, onChange, router }) => {
  const { crime, place } = router.params
  const hide = () => dispatch(hideSidebar())

  return (
    <nav className={`site-sidebar bg-white ${isOpen ? 'open' : ''}`}>
      <div className='p2 bg-red-bright line-height-1 md-hide lg-hide'>
        <button
          type='button'
          className='right btn p0 fs-12 caps line-height-4 black'
          onClick={hide}
        >
          Close
        </button>
        <img
          className='align-middle'
          width='22'
          height='20'
          src='img/filters.svg'
          alt='filters'
        />
      </div>
      <div className='p6 sm-p3 md-p4'>
        <LocationFilter
          onChange={onChange}
          selected={place}
        />
        <TimePeriodFilter
          timeFrom={filters.timeFrom}
          timeTo={filters.timeTo}
          onChange={onChange}
        />
        <CrimeTypeFilter
          onChange={onChange}
          selected={crime}
        />
      </div>
    </nav>
  )
}

Sidebar.propTypes = {
  onChange: React.PropTypes.func,
}

export default Sidebar
