import React from 'react'

import LocationSelect from './LocationSelect'
import LocationSelectCounties from './LocationSelectCounties'
import LocationSvg from './LocationSvg'


class LocationFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { county: '' }
  }

  updateCounty = county => {
    this.setState({ county })
  }

  render() {
    const { onChange, selected } = this.props
    const { county } = this.state

    return (
      <div id='location' className='mb4'>
        <div className='mb3 fs-22 bold border-bottom'>Location</div>
        <LocationSvg
          selected={selected}
          usCounty={county}
          usCountyUpdate={this.updateCounty}
        />
        <LocationSelect
          onChange={onChange}
          selected={selected}
        />
        <LocationSelectCounties
          usCounty={county}
          usCountyUpdate={this.updateCounty}
          usState={selected}
        />
      </div>
    )
  }
}

LocationFilter.defaultProps = {
  selected: '',
}

export default LocationFilter
