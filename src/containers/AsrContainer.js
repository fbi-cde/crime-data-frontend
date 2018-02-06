import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import { getAgency } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import { nationalKey } from '../util/usa'
import lookupUsa from '../util/usa'
import api from '../util/api'

class AsrContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { asrData: {} }
  }

  componentDidMount() {
    const { filters } = this.props
    const place = filters.placeType
    const placeValue = place==='agency'?filters.place:filters.placeId
    api.getAsrMaleByAge(place,placeValue).then(asrData => {
      this.setState({ asrData })
    })
  }

  getContent = ({
    place,
    placeDisplay,
    since,
    until,
    filters,
  }) => {
    const { asrData } = this.state
    const asrString = JSON.stringify(asrData)

    const places = [place]
    if (place !== nationalKey) places.push(nationalKey)

    return (
      <div>
        { asrString }
      </div>
    )
  }

  render() {
    const { agency, isAgency, place, placeType, since, until, filters } = this.props

    const placeDisplay = isAgency ? agency.display : lookupUsa(place).display

    return (
      <div className="mb6">
        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
            {placeDisplay} Arrest Data
          </h2>
          {this.getContent({ place, placeType, placeDisplay, since, until, filters })}
        </div>
      </div>
    )
  }
}

AsrContainer.propTypes = {
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters }) => {
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
  }
}

export default connect(mapStateToProps)(AsrContainer)
