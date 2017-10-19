import PropTypes from 'prop-types'
import React from 'react'

import lookup, { data } from '../util/usa'

class LocationSelect extends React.Component {

  handleChange = e => {
    console.log("Location Select Change:",e.target.value)
    let placeType = 'state'
    if (!lookup(e.target.value)) {
      placeType = 'region'
    }
    this.props.onChange({
      place: e.target.value,
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
    } = this.props

    const regionOpts = []
    for (var region in regionData){
      regionOpts.push(
        <option value={regionData[region].region_name}>
          {regionData[region].region_desc} - {regionData[region].region_name}
        </option>);
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
            <option value="" disabled>
              States
            </option>
            {data.map((p, i) =>
              <option key={i} value={p.slug}>
                {p.display}
              </option>,
            )}
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
}


export default LocationSelect
