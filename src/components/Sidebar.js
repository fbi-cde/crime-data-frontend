import React from 'react'

import CrimeTypeFilter from './CrimeTypeFilter'
import LocationFilter from './LocationFilter'
import TimePeriodFilter from './TimePeriodFilter'

const Sidebar = ({ filters, onChange, router }) => {
  const { crime, place } = router.params

  return (
    <nav className='site-sidebar bg-white'>
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
