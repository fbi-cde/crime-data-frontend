import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import startCase from 'lodash.startcase'

import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import { getPlaceInfo } from '../util/place'
import { lookupDisplayName } from '../util/location'
import StateCountyThumbnail from '../components/StateCountyThumbnail'
import StateCountyThumbnailDetails from '../components/StateCountyThumbnailDetails'
import { sentenceCase } from '../util/text'

class CountyViewContainer extends React.Component {
  constructor(props) {
    super(props)
    const { until, place } = props
    this.state = { yearSelected: until, countySelected: null }
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  updateLocation = county => {
    console.log('Updated Location:', county)
    this.setState({ countySelected: county.trim() })
  }

  render() {
    console.log('CountyViewContainer State:', this.state)
    const { filters, counties, states } = this.props
    if (filters.place === 'washington-dc') {
      return <div />
    }
    if (counties.loading === true) {
      return <Loading />
    }
    const placeDisplay = lookupDisplayName(filters, null, states.states)

    const countySelectedYear = counties.data.data.filter(
      d => d.data_year === this.state.yearSelected
    )
    let countyObj = null

    if (this.state.countySelected === null) {
      this.state.countySelected = countySelectedYear[0].county_name
      countyObj = countySelectedYear[0]
    }

    // Add State data
    const stateObj = Object()
    stateObj.data_year = this.state.yearSelected
    stateObj.population = 0
    stateObj.actual_incident_count = 0
    stateObj.name = placeDisplay
    stateObj.offense = countySelectedYear[0].offense
    for (let i = 0; i < countySelectedYear.length; i++) {
      stateObj.population += countySelectedYear[i].population
      stateObj.actual_incident_count +=
        countySelectedYear[i].actual_incident_count
      if (
        sentenceCase(countySelectedYear[i].county_name) ===
        sentenceCase(this.state.countySelected)
      ) {
        countyObj = countySelectedYear[i]
      }
    }

    return (
      <div className="mb1 bg-white border-top border-blue border-w8">
        <div>
          <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w">
            <h2 className="mt0 mb2 sm-mb4 fs-24 sm-fs-28 sans-serif">
              {startCase(filters.pageType)} rate by {placeDisplay} Counties
            </h2>
            <div className="clearfix mxn1">
              <div className="sm-col sm-col-6 mb2 lg-m0 p0 sm-pr4 lg-pr6 fs-18">
                <div className="fs-14 sm-fs-14 italic">
                  Click on counties on map or choose from the dropdown on the
                  right to view county level summary data.
                </div>
                <StateCountyThumbnail
                  placeName={filters.place}
                  countyData={countySelectedYear}
                  onChangeLocation={this.updateLocation}
                  selectedCountyString={this.state.countySelected}
                />
              </div>
              <div className="sm-col sm-col-6 xs-hide">
                <StateCountyThumbnailDetails
                  stateData={stateObj}
                  countyData={countySelectedYear}
                  selectedYear={this.state.yearSelected}
                  selectedLocation={countyObj}
                  since={filters.since}
                  until={filters.until}
                  onChangeYear={this.updateYear}
                  onChangeLocation={this.updateLocation}
                  selectedCountyString={this.state.countySelected}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CountyViewContainer.propTypes = {
  counties: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool
  }).isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired
}

const mapStateToProps = ({ filters, counties, states }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)

  return {
    filters,
    place,
    placeType,
    since,
    until,
    counties,
    states
  }
}

export default connect(mapStateToProps)(CountyViewContainer)
