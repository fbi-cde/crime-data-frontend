import React from 'react'
import startCase from 'lodash.startcase'

import LocationSelect from './LocationSelect'
import StateThumbnail from './StateThumbnail'

const LocationFilter = ({ onChange, selected }) => {
  const placeDisplay = startCase(selected)

  return (
    <div id='location' className='mb4'>
      <h3 className='fs1 sans-serif mt0 mb2 pb-tiny border-bottom'>
        Location
      </h3>
      <div className='pt1 pb2 center'>
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
