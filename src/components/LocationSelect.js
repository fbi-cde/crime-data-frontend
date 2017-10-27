import PropTypes from 'prop-types'
import React from 'react'
import lowerCase from 'lodash.lowercase'
import { connect } from 'react-redux'

import lookup from '../util/usa'

class LocationSelect extends React.Component {

  handleChange = e => {
    console.log('Location Select Change:', e.target.value)
    let placeType = 'state'
    if (!lookup(e.target.value)) {
      placeType = 'region'
    }
    this.props.onChange({
      place: e.target.value.toLowerCase(),
      placeType,
    })
  }

  render() {
    const {
      ariaControls,
      className,
      onFocus,
      selected,
      region,
      states,
    } = this.props

    const regionOpts = []
    for (const r in region.regions) {
      if (region.regions[r].region_code !== 0 && region.regions[r].region_code !== 99) {
        regionOpts.push(
          <option value={lowerCase(region.regions[r].region_name)}>
            {region.regions[r].region_desc} - {region.regions[r].region_name}
          </option>);
      }
    }
    const stateOpts = []

    for (const s in states.states) {
      if (states.states[s].region_code !== 0 && states.states[s].region_code !== 99 && states.states[s].state_id !== 43) {
        stateOpts.push(
          <option value={lowerCase(states.states[s].state_name)}>
            {states.states[s].state_name}
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
  region: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
}

const mapStateToProps = ({ region, states }) => ({
    region,
    states,
  })

export default connect(mapStateToProps)(LocationSelect)
