import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import { getPlaceInfo } from '../util/place'
import { lookupDisplayName } from '../util/location'
import StateCountyThumbnail from '../components/StateCountyThumbnail'

class PopulationCoveredContainer extends React.Component {
  constructor(props) {
    super(props)
    const { until } = props
    this.state = { yearSelected: until }
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  render() {
    const { filters, region, states } = this.props

    const placeDisplay = lookupDisplayName(filters, null, states.states)

    return (
      <div className="mb1 bg-white border-top border-blue border-w8">
        <div>
          <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w">
            <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
              County participation data in {placeDisplay}
            </h2>
            <div className="clearfix mxn1">
              <div className="sm-col sm-col-6 mb2 lg-m0 p0 sm-pr4 lg-pr6 fs-18">
                <div className="fs-14 sm-fs-14 italic">
                  Hover over counties on map or choose from the dropdown on the right to view county level participation data.
                </div>
                <StateCountyThumbnail placeName={filters.place} />
              </div>
              <div className="sm-col sm-col-6 xs-hide">
                Other stuff
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PopulationCoveredContainer.propTypes = {
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ filters, policeEmployment, states }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)

  return {
    filters,
    place,
    placeType,
    since,
    until,
    policeEmployment,
    states,
  }
}

export default connect(mapStateToProps)(PopulationCoveredContainer)
