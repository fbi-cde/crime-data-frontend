import React from 'react'
import startCase from 'lodash.startcase'

import LocationSelect from './LocationSelect'

const LocationFilter = ({ onChange, selected }) => (
  <div id='location' className='mb4'>
    <div className='mb3 fs-22 bold border-bottom'>Location</div>
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
