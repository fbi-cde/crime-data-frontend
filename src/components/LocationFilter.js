import { entries } from 'd3-collection'
import React from 'react'
import startCase from 'lodash.startcase'

import StateThumbnail from './StateThumbnail'

import { states } from '../util/usa'
import { slugify } from '../util/text'

const usaStates = entries(states).map(d => startCase(d.value))

const LocationFilter = ({ onChange, selected }) => {
  const handleChange = e => onChange({ place: slugify(e.target.value) })
  const placeDisplay = startCase(selected)

  return (
    <div id='location' className='mb4'>
      <h3 className='mt0 mb2 pb-tiny border-bottom'>{placeDisplay}</h3>
      <div className='pt1 pb2 center'>
        <StateThumbnail selected={placeDisplay} />
      </div>
      <select
        className='block col-12 field'
        onChange={handleChange}
        value={placeDisplay}
      >
        {usaStates.map((s, i) => (
          <option key={i}>{s}</option>
        ))}
      </select>
    </div>
  )
}

LocationFilter.defaultProps = {
  selected: '',
}

export default LocationFilter
