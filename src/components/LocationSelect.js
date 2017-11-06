import PropTypes from 'prop-types'
import React from 'react'
import lowerCase from 'lodash.lowercase'
import { connect } from 'react-redux'
import { slugify } from '../util/text'

import { isValidState, lookupStateByName, lookupRegionByName } from '../util/location'

class LocationSelect extends React.Component {
  handleChange = e => {
    const { states, region } = this.props
    let placeType = 'state'
    let placeId
    if (e.target.value === 'united-states') {
       placeType = 'national'
       placeId = 'national'
    } else if (!isValidState(states.states, e.target.value)) {
      placeType = 'region'
      placeId = lookupRegionByName(region.regions, e.target.value).region_code
    } else {
      placeId = lookupStateByName(states.states, e.target.value).state_abbr
    }
    console.log('slugify(e.target.value.toLowerCase():', slugify(e.target.value.toLowerCase()))
    this.props.onChange({
      place: slugify(e.target.value.toLowerCase()),
      placeType,
      placeId,
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
          <option key={lowerCase(region.regions[r].region_name)} value={lowerCase(region.regions[r].region_name)}>
            {region.regions[r].region_desc} - {region.regions[r].region_name}
          </option>);
      }
    }
    const stateOpts = []

    for (const s in states.states) {
      if (states.states[s].region_code !== 0 && states.states[s].region_code !== 99 && states.states[s].state_id !== 43) {
        stateOpts.push(
          <option key={slugify(lowerCase(states.states[s].state_name))} value={slugify(lowerCase(states.states[s].state_name))}>
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
            <option value="united-states">
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
