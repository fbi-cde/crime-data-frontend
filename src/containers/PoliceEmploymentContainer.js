import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import TrendChart from '../components/trend/TrendChart'
import { getPlaceInfo } from '../util/place'
import { lookupDisplayName } from '../util/location'
import { nationalKey } from '../util/usa'
import { peFilterByYear, peCombinePlaces } from '../util/policeEmployment'

class PoliceEmploymentContainer extends React.Component {
  constructor(props) {
    super(props)
    const { until } = props
    this.state = { yearSelected: until }
  }

  getContent = ({
    agency,
    isAgency,
    policeEmployment,
    place,
    placeType,
    placeDisplay,
    since,
    until,
    filters,
    region,
    states,
  }) => {
    const { yearSelected } = this.state
    const { data, loading, error } = policeEmployment

    if (loading) return <Loading />
    if (error) return <ErrorCard error={error} />

    const places = [place]
    if (place !== nationalKey) places.push(nationalKey)

    const peByYear = peFilterByYear(data, since, until)
    const peCombined = peCombinePlaces(peByYear, ['police-employment'])

    return (
      <div>
        <TrendChart
          crime="police-employment"
          filters={filters}
          data={peCombined}
          places={places}
          onChangeYear={this.updateYear}
          initialYearSelected={yearSelected}
          placeName={placeDisplay}
        />
      </div>
    )
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  render() {
    const { agency, isAgency, policeEmployment, place, placeType, since, until, filters, region, states } = this.props
    let placeDisplay = null
    if ( isAgency ) {
      placeDisplay = agency.display
    }
    else if ( placeType === 'region' || placeType === 'state' ) {
      placeDisplay = lookupDisplayName(filters, region.regions, states.states)
    }
    else {
      placeDisplay = "United States"
    }
    return (
      <div className="mb6">
        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
            {placeDisplay} Police Employment
          </h2>
          {this.getContent({agency, isAgency, policeEmployment, place, placeType, placeDisplay, since, until, filters, region, states})}
        </div>
      </div>
    )
  }
}

PoliceEmploymentContainer.propTypes = {
  policeEmployment: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, policeEmployment, region, states }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  return {
    filters,
    agency,
    isAgency,
    place,
    placeType,
    since,
    until,
    policeEmployment,
    region,
    states,
  }
}

export default connect(mapStateToProps)(PoliceEmploymentContainer)
