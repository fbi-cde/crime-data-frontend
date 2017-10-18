import PropTypes from 'prop-types'
import React from 'react'

import { data } from '../util/usa'

const LocationSelect = ({
  ariaControls,
  className,
  onChange,
  onFocus,
  selected,
  regionData,
}) => {
  const handleChange = e => {
    onChange({
      place: e.target.value,
      placeType: e.target.placeType,
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
          className ||
          'block col-12 field field-sm select select-dark border-blue'
        }
        id="location-select"
        onChange={handleChange}
        onClick={onFocus}
        value={selected || ''}
      >

        <option id='usa' value="united-states" >
          United States
        </option>
        <option value="" disabled>
          States
        </option>
        {data.map((p, i) =>
          <option key={i} value={p.slug} name={p.placeType}>
            {p.display}
          </option>,
        )}
        <option value="" disabled>
          Regions
        </option>
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
