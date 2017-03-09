import React from 'react'
import startCase from 'lodash.startcase'

import LocationSelect from './LocationSelect'
import PlaceThumbnail from './PlaceThumbnail'

const LocationFilter = ({ onChange, selected }) => (
  <div id='location' className='mb4'>
    <div className='mb2 fs-22 bold border-bottom'>Location</div>
    <PlaceThumbnail place={selected} />
    <LocationSelect
      onChange={onChange}
      selected={startCase(selected)}
    />
  </div>
)

LocationFilter.defaultProps = {
  selected: '',
}

export default LocationFilter
