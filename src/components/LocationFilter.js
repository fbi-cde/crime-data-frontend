import startCase from 'lodash.startcase'
import React from 'react'

import AgencySearch from './AgencySearch'
import LocationSelect from './LocationSelect'
import { nationalKey } from '../util/usa'

class LocationFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showResults: false,
    }
  }

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
  usState: '',
}

export default LocationFilter
