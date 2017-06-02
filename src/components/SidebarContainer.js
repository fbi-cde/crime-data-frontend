import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import CrimeTypeFilter from './CrimeTypeFilter'
import LocationFilter from './LocationFilter'
import TimePeriodFilter from './TimePeriodFilter'
import { hideSidebar } from '../actions/sidebar'
import { getAgency, oriToState } from '../util/ori'

const SidebarContainer = ({
  agency,
  agencyData,
  crime,
  hide,
  filters,
  isOpen,
  onChange,
  showSearch,
  usState,
}) => (
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
        onChange={onChange}
        showSearch={showSearch}
        usState={usState}
      />
      <TimePeriodFilter onChange={onChange} {...filters} />
      <CrimeTypeFilter onChange={onChange} selected={crime} />
    </div>
  </nav>
)

SidebarContainer.propTypes = {
  onChange: PropTypes.func,
}

const formatAgencyData = (agencies, state) =>
  Object.keys(agencies[state] || {}).map(id => ({
    ori: id,
    ...agencies[state][id],
  }))

const mapStateToProps = ({ agencies, filters, sidebar }) => {
  const { agencySearch, crime, place, placeType } = filters

  const isAgency = placeType === 'agency'
  const usState = isAgency ? oriToState(place) : place
  const agency = isAgency && getAgency(agencies, place)
  const agencyData = usState && formatAgencyData(agencies.data, usState)

  return {
    agency,
    agencyData,
    crime,
    filters,
    isOpen: sidebar.isOpen,
    showSearch: agencySearch === 'true',
    usState,
  }
}
const mapDispatchToProps = dispatch => ({
  hide: () => dispatch(hideSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)
