import React from 'react'

import AgencySearch from './AgencySearch'
import LocationSelect from './LocationSelect'

const LocationFilter = ({ onChange, selected }) => (
  <div id="location" className="mb4">
    <div className="mb3 fs-22 bold border-bottom">Location</div>
    <LocationSelect onChange={onChange} selected={selected} />
    <AgencySearch />
  </div>
)

LocationFilter.defaultProps = {
  selected: '',
}

export default LocationFilter
