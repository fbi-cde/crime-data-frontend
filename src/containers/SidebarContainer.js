import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import CrimeTypeFilter from '../components/CrimeTypeFilter'
import LocationFilter from '../components/LocationFilter'
import TimePeriodFilter from '../components/TimePeriodFilter'
import { hideSidebar } from '../actions/sidebar'
import { newGetAgency, newOriToState } from '../util/agencies'

const SidebarContainer = ({
  actions,
  agency,
  agencyData,
  ariaControls,
  crime,
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
        onClick={actions.hide}
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
        placeType={filters.placeType}
      />agencies
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

const mapStateToProps = ({ agencies, filters, sidebar, region, states }) => {
  const { crime, place, placeType } = filters
  const isAgency = placeType === 'agency'
  const displayAgencies = (placeType !== 'region' || placeType !== 'national') && agencies.loaded
  const usState = isAgency ? newOriToState(place, states) : place
  const agency = newGetAgency(agencies.data, place, placeType)
  const agencyData = displayAgencies ? Object.keys(agencies.data).map(k => agencies.data[k]) : []


  return {
    agency,
    agencyData,
    crime,
    filters,
    isOpen: sidebar.isOpen,
    usState,
    region,
    states,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: {
    hide: () => dispatch(hideSidebar()),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)
