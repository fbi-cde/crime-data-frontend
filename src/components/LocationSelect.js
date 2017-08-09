import PropTypes from 'prop-types'
import React from 'react'

import { data } from '../util/usa'

const LocationSelect = ({
  ariaControls,
  className,
  onChange,
  onFocus,
  selected,
}) => {
  const handleChange = e => {
    onChange({
      place: e.target.value,
      placeType: 'state',
    })
  }

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
        value={selected || ''}
      >
        <option value="" disabled>
          Location
        </option>
        {data.map((p, i) =>
          <option key={i} value={p.slug}>
            {p.display}
          </option>,
        )}
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
