import React from 'react'
import startcase from 'lodash.startcase'

import { slugify } from '../util/text'
import { states } from '../util/usa'

const usaStates = Object.values(states).map(s => startcase(s))

const LocationFilter = ({ onChange, selected }) => {
  const handleChange = e => {
    const value = slugify(e.target.value)
    onChange({ id: 'state', value })
  }
  return (
    <div id='location' className='mb3'>
      <div className='mb2 pb-tiny h5 caps bold border-bottom'>
        Location
      </div>
      <select
        className='block col-12 field'
        defaultValue={selected}
        onChange={handleChange}
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
