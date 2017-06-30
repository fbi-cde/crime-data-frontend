import { entries } from 'd3-collection'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import { slugify } from '../util/text'
import { data } from '../util/usa'

const places = entries(data).map(d => startCase(d.value))

const LocationSelect = ({
  ariaControls,
  className,
  onChange,
  onFocus,
  selected,
}) => {
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
        aria-controls={ariaControls}
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
  className: '',
  selected: '',
}

LocationSelect.propTypes = {
  ariaControls: PropTypes.string,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  selected: PropTypes.string.isRequired,
}

export default LocationSelect
