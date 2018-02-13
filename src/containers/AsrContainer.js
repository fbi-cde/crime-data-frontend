import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import BarChart from '../components/graphs/BarChart'
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
  }

  getContent = ({
    asr,
    place,
    placeDisplay,
    since,
    until,
    filters,
  }) => {

    let maleByAge = asr.data["male-by-age"]
    const filteredByOffense = maleByAge.data.filter(d => d.key_type === "Murder and Nonnegligent Manslaughter")
    maleByAge.data = filteredByOffense

    return (
      <div>
        <BarChart data={maleByAge} year={2016} />
      </div>
    )
  }

  render() {
    const { agency, isAgency, asr, place, placeType, since, until, filters } = this.props

    const placeDisplay = isAgency ? agency.display : lookupUsa(place).display

    return (
      <div className="mb6">
        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
            {placeDisplay} Arrest Data
          </h2>
          {this.getContent({ asr, place, placeType, placeDisplay, since, until, filters })}
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

const mapStateToProps = ({ agencies, asr, filters }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  return {
    filters,
    asr,
    agency,
    isAgency,
    place,
    placeType,
    since,
    until,
  }
}

export default connect(mapStateToProps)(AsrContainer)
