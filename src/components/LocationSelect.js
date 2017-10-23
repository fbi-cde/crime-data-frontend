import PropTypes from 'prop-types'
import React from 'react'
import lowerCase from 'lodash.lowercase'

import lookup, { data } from '../util/usa'

class LocationSelect extends React.Component {

  handleChange = e => {
    console.log("Location Select Change:",e.target.value)
    let placeType = 'state'
    if (!lookup(e.target.value)) {
      placeType = 'region'
    }
    this.props.onChange({
      place: e.target.value.toLowerCase(),
      placeType: placeType,
    })
  }

  render(){
    const{
      ariaControls,
      className,
      onFocus,
      selected,
      regionData,
      stateData,
    } = this.props

    const regionOpts = []
    for (var region in regionData) {
      if (regionData[region].region_code !== 0 && regionData[region].region_code !== 99) {
        regionOpts.push(
          <option value={lowerCase(regionData[region].region_name)}>
            {regionData[region].region_desc} - {regionData[region].region_name}
          </option>);
      }
    }
    const stateOpts = []

    for (var state in stateData) {
      if (stateData[state].region_code !== 0 && stateData[state].region_code !== 99 && stateData[state].state_id !== 43) {
        stateOpts.push(
          <option value={lowerCase(stateData[state].state_name)}>
            {stateData[state].state_name}
          </option>);
      }
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
            onChange={this.handleChange}
            onClick={onFocus}
            value={selected || ''}
          >
            <option value="usa">
              United States
            </option>
            <option value="" disabled>
              States
            </option>
            {stateOpts}
            <option value="" disabled>
              Regions
            </option>
            {regionOpts}
            </select>
        </div>
      )
    }
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
  regionData: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired,

}


export default LocationSelect
