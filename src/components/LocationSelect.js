import { entries } from 'd3-collection'
import React from 'react'
import startCase from 'lodash.startcase'

import { states } from '../util/usa'
import { slugify } from '../util/text'

const usaStates = entries(states).map(d => startCase(d.value))

const defaultOnChange = change => {
  const message = '<LocationSelect /> needs an onChange prop to do anything'
  console.error(message, change)
}

const LocationSelect = ({ className, onChange, selected }) => {
  const handleChange = e => onChange({ place: slugify(e.target.value) })

  return (
    <div>
      <label htmlFor='location-select' className='hide'>
        Choose a location in the United States
      </label>
      <select
        className={className || 'block col-12 field'}
        id='location-select'
        onChange={handleChange}
        value={(selected) ? startCase(selected) : ''}
      >
        {usaStates.map((s, i) => (
          <option key={i}>{s}</option>
        ))}
      </select>
    </div>
  )
}

LocationSelect.defaultProps = {
  className: false,
  onChange: defaultOnChange,
  selected: false,
}

export default LocationSelect
