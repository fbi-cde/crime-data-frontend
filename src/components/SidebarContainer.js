import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import CrimeTypeFilter from './CrimeTypeFilter'
import LocationFilter from './LocationFilter'
import TimePeriodFilter from './TimePeriodFilter'
import { hideSidebar } from '../actions/sidebar'

const SidebarContainer = ({ dispatch, filters, isOpen, onChange }) => {
  const { crime, place, placeType } = filters
  const hide = () => dispatch(hideSidebar())

  return (
    <nav className={`site-sidebar bg-white ${isOpen ? 'open' : ''}`}>
      <div className="p2 bg-red-bright line-height-1 md-hide lg-hide">
        <button
          type="button"
          className="right btn p0 fs-12 caps line-height-4 black"
          onClick={hide}
        >
          Close
        </button>
        <img
          className="align-middle"
          width="22"
          height="20"
          src="/img/filters.svg"
          alt="filters"
        />
      </div>
      <div className="p6 sm-p3 md-p4">
        <LocationFilter
          agencies={agencies}
          onChange={onChange}
          place={place}
          placeType={placeType}
        />
        <TimePeriodFilter onChange={onChange} {...filters} />
        <CrimeTypeFilter onChange={onChange} selected={crime} />
      </div>
    </nav>
  )
}

SidebarContainer.propTypes = {
  onChange: PropTypes.func,
}

const mapStateToProps = ({ filters, sidebar }) => ({
  filters,
  isOpen: sidebar.isOpen,
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)
