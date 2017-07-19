import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import CrimeTypeFilter from '../components/CrimeTypeFilter'
import LocationFilter from '../components/LocationFilter'
import TimePeriodFilter from '../components/TimePeriodFilter'
import { hideSidebar } from '../actions/sidebar'
import { getAgency, oriToState } from '../util/agencies'
import { nationalKey } from '../util/usa'

const SidebarContainer = ({
  agency,
  agencyData,
  ariaControls,
  crime,
  hide,
  filters,
  isOpen,
  onChange,
  usState,
}) =>
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
        agency={agency}
        agencyData={agencyData}
        ariaControls={ariaControls}
        onChange={onChange}
        usState={usState}
      />
      <TimePeriodFilter
        ariaControls={ariaControls}
        onChange={onChange}
        {...filters}
      />
      <CrimeTypeFilter
        ariaControls={ariaControls}
        onChange={onChange}
        selected={crime}
      />
    </div>
  </nav>

SidebarContainer.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

const formatAgencyData = (agencies, state) =>
  Object.keys(agencies[state] || {}).map(id => ({
    ori: id,
    ...agencies[state][id],
  }))

const mapStateToProps = ({ agencies, filters, sidebar }) => {
  const { crime, place, placeType } = filters

  const isAgency = placeType === 'agency'
  const isNational = place === nationalKey
  const usState = isAgency ? oriToState(place) : place
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)
  const agencyData = isNational ? [] : formatAgencyData(agencies.data, usState)

  return {
    agency,
    agencyData,
    crime,
    filters,
    isOpen: sidebar.isOpen,
    usState,
  }
}
const mapDispatchToProps = dispatch => ({
  hide: () => dispatch(hideSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)
