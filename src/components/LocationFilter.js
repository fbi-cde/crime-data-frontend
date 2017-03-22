import React from 'react'

import LocationCountySelect from './LocationCountySelect'
import LocationSelect from './LocationSelect'
import PlaceThumbnail from './PlaceThumbnail'


const LocationFilter = ({ onChange, selected }) => (
  <div id='location' className='mb4'>
    <div className='mb3 fs-22 bold border-bottom'>Location</div>
    <PlaceThumbnail selected={selected} />
    <LocationSelect onChange={onChange} selected={selected} />
    <LocationCountySelect onChange={onChange} selectedState={selected} />
  </div>
)

LocationFilter.defaultProps = {
  selected: '',
}

export default LocationFilter
