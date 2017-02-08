/* eslint no-console: 0 */
import { entries } from 'd3-collection'
import React from 'react'
import startCase from 'lodash.startcase'

import { data } from '../util/usa'
import { slugify } from '../util/text'

const places = entries(data).map(d => startCase(d.value))

const LocationSelect = ({ className, onChange, selected }) => {
  const handleChange = e => onChange({ place: slugify(e.target.value) })

  return (
    <div>
      <label htmlFor='location-select' className='hide'>
        Choose a location in the United States
      </label>
      <select
        className={className || 'block col-12 field field-sm'}
        id='location-select'
        onChange={handleChange}
        value={(selected) ? startCase(selected) : ''}
      >
        {places.map((p, i) => (
          <option key={i}>{p}</option>
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
