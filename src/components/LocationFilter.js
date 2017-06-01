import startCase from 'lodash.startcase'
import React from 'react'

import AgencySearch from './AgencySearch'
import LocationSelect from './LocationSelect'
import { nationalKey } from '../util/usa'

const LocationFilter = ({
  agency,
  agencyData,
  onChange,
  showSearch,
  usState,
}) => (
  <div id="location" className="mb4">
    <div className="mb3 fs-22 bold border-bottom">Location</div>
    <LocationSelect onChange={onChange} selected={startCase(usState)} />
    {showSearch &&
      usState !== nationalKey &&
      <AgencySearch
        onChange={onChange}
        agency={(agency || {}).agency_name || ''}
        data={agencyData}
      />}
  </div>
)

LocationFilter.defaultProps = {
  usState: '',
  showSearch: false,
}

export default LocationFilter
