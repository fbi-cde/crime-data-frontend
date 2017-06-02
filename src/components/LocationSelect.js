/* eslint no-console: 0 */

import { entries } from 'd3-collection'
import startCase from 'lodash.startcase'
import React from 'react'

import { slugify } from '../util/text'
import { data } from '../util/usa'

const places = entries(data).map(d => startCase(d.value))

const LocationSelect = ({ className, onChange, onFocus, selected }) => {
  const handleChange = e =>
    onChange({
      place: slugify(e.target.value),
      placeType: 'state',
    })

  return (
    <div>
      <label htmlFor="location-select" className="hide">
        Choose a location in the United States
      </label>
      <select
        className={
          className || 'block col-12 field field-sm select select-dark'
        }
        id="location-select"
        onChange={handleChange}
        onClick={onFocus}
        value={selected ? startCase(selected) : ''}
      >
        <option value="" disabled>Location</option>
        {places.map((p, i) => <option key={i}>{p}</option>)}
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
