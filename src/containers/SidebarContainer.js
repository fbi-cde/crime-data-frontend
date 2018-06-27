import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import CrimeTypeFilter from '../components/CrimeTypeFilter'
import LocationFilter from '../components/LocationFilter'
import TimePeriodFilter from '../components/TimePeriodFilter'
import { hideSidebar } from '../actions/sidebar'
import { getAgency, oriToState } from '../util/agencies'
import { nationalKey, fromSlug } from '../util/usa'

const SidebarContainer = ({
  actions,
  agency,
  agencyData,
  ariaControls,
  pageType,
  filters,
  isOpen,
  onChange,
  usState,
  locState
}) => (
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
        locState={locState}
      />
      <TimePeriodFilter
        ariaControls={ariaControls}
        onChange={onChange}
        {...filters}
      />
      <CrimeTypeFilter
        ariaControls={ariaControls}
        onChange={onChange}
        selected={pageType}
      />
    </div>
  </nav>
)

SidebarContainer.propTypes = {
  ariaControls: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

const formatAgencyData = (agencies, state) =>
  Object.keys(agencies[state] || {}).map(id => ({
    ori: id,
    ...agencies[state][id]
  }))

const mapStateToProps = ({ agencies, filters, sidebar, region, states }) => {
  const { pageType, place, placeType } = filters
  const isAgency = placeType === 'agency'
  const isNational = place === nationalKey
  const locState = isAgency ? oriToState(place) : place

  const usState = isAgency
    ? place.slice(0, 2).toUpperCase()
    : fromSlug(place).id.toUpperCase()
  let agency =
    isAgency &&
    !agencies.loading &&
    agencies.loaded &&
    getAgency(agencies, place)
  if (!agency) {
    agency = {}
  }
  let agencyData = []
  if (!agencies.loading && agencies.loaded) {
    agencyData = formatAgencyData(agencies.data, usState)
    console.log('sbc:', usState, agency, agencyData)
  }
  return {
    agency,
    agencyData,
    pageType,
    filters,
    isOpen: sidebar.isOpen,
    usState,
    region,
    states,
    locState
  }
}
const mapDispatchToProps = dispatch => ({
  actions: {
    hide: () => dispatch(hideSidebar())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)
