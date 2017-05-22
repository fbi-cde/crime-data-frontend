import startCase from 'lodash.startcase'
import React from 'react'

import AgencySearch from './AgencySearch'
import LocationSelect from './LocationSelect'
import { oriToState } from '../util/ori'
import { nationalKey } from '../util/usa'

const LocationFilter = ({ agencies, onChange, place, placeType }) => {
  const isNational = place === nationalKey
  const isAgency = placeType === 'agency'
  const selected = isAgency ? oriToState(place) : place

  return (
    <div id="location" className="mb4">
      <div className="mb3 fs-22 bold border-bottom">Location</div>
      <LocationSelect onChange={onChange} selected={startCase(selected)} />
      {selected &&
        !isNational &&
        <AgencySearch
          agencies={agencies.data}
          onChange={onChange}
          ori={isAgency && place}
          state={selected}
        />}
    </div>
  )
}

LocationFilter.defaultProps = {
  selected: '',
}

export default LocationFilter
