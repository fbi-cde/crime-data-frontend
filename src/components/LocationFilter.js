import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import AgencySearch from './AgencySearch'
import LocationSelect from './LocationSelect'
import { nationalKey } from '../util/usa'

class LocationFilter extends React.Component {
  state = { showResults: false }

  handleLocationFocus = () => {
    this.setState({ showResults: false })
  }

  render() {
    const { agency, agencyData, onChange, usState } = this.props
    const { showResults } = this.state

    return (
      <div id="location" className="mb4">
        <div className="mb3 fs-22 bold border-bottom">Location</div>
        <LocationSelect
          onChange={onChange}
          onFocus={this.handleLocationFocus}
          selected={startCase(usState)}
        />
        {usState !== nationalKey &&
          <AgencySearch
            onChange={onChange}
            agency={(agency || {}).agency_name || ''}
            data={agencyData}
            initialShowResults={showResults}
          />}
      </div>
    )
  }
}

LocationFilter.defaultProps = {
  usState: nationalKey,
}

LocationFilter.propTypes = {
  agency: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  agencyData: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  usState: PropTypes.string.isRequired,
}

export default LocationFilter
