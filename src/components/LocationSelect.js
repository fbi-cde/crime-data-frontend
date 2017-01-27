/* eslint no-console: 0 */
import { entries } from 'd3-collection'
import React from 'react'
import startCase from 'lodash.startcase'

import { states } from '../util/usa'
import { slugify } from '../util/text'

const usaStates = entries(states).map(d => startCase(d.value))

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
        <option key='0' value='' disabled>United States</option>
        {usaStates.map((s, i) => (
          <option key={i + 1}>{s}</option>
        ))}
      </select>
    </div>
  )
}

LocationSelect.defaultProps = {
  className: false,
  onChange: e => console.error('<LocationSelect /> needs onChange', e),
  selected: false,
}

export default LocationSelect
