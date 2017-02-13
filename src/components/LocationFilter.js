import React from 'react'
import startCase from 'lodash.startcase'

import LocationSelect from './LocationSelect'
import StateThumbnail from './StateThumbnail'

const LocationFilter = ({ onChange, selected }) => {
  const placeDisplay = startCase(selected)

  return (
    <div id='location' className='mb4'>
      <div className='mb2 fs-22 bold border-bottom'>Location</div>
      <div className='my4 center'>
        <StateThumbnail selected={placeDisplay} />
      </div>
      <LocationSelect
        onChange={onChange}
        selected={placeDisplay}
      />
    </div>
  )
}

LocationFilter.defaultProps = {
  selected: '',
}

export default LocationFilter
