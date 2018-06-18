import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'

import Loading from '../components/Loading'
import VAWChart from '../components/vaw/VAWChart'
import DownloadDataBtn from '../components/downloads/DownloadDataBtn'
import lookupUsa from '../util/usa'
import { getPlaceInfo } from '../util/place'
import { vawDataSetCrimes } from '../util/specializedDataSet'
import NoData from '../components/NoData'

import ucrParticipation, {
  shouldFetchNibrs as shouldShowNibrs
} from '../util/participation'

class VAWContainer extends React.Component {
  constructor(props) {
    super(props)
    const { param } = props
    this.state = { crimeSelected: param }
  }

  updateCrimeSelected = crime => {
    this.setState({ crimeSelected: crime })
  }

  render() {
    const {
      param,
      place,
      placeType,
      since,
      until,
      vaw,
      states,
      filters,
      pageType
    } = this.props
    let nibrsData
    let nibrsDataClean
    let hasNoNibrsValues
    let noNibrsDataText
    const handleSelectChange = e => this.updateCrimeSelected(e.target.value)

    const isAgency = placeType === 'agency'
    const placeDisplay = isAgency ? agency.display : lookupUsa(place).display

    if (
      (isAgency && (!agency || agency.nibrs === false)) ||
      !shouldShowNibrs({ pageType, place, placeType }, states)
    ) {
      return null
    }
    const submitsNibrs = true

    if (vaw.loading) return <Loading />

    console.log('VAWContainer Submitts NIBSR')
    if (submitsNibrs) {
      nibrsData = vaw.data.offenseCount.data
      nibrsDataClean = nibrsData
        .filter(
          d =>
            d.key === 'Offense Count' &&
            d.data_year >= since &&
            d.data_year <= until
        )
        .sort((a, b) => a.data_year - b.data_year)

      hasNoNibrsValues =
        nibrsDataClean.length ===
        nibrsDataClean.filter(d => d.actual === 0 && d.cleared === 0).length

      noNibrsDataText = `There were no ${lowerCase(
        pageType
      )} offenses reported during this time period.`
    }

    const fname = `${place}-${pageType}-${since}-${until}`

    const noun = 'offenses'

    console.log('Render VAW Container:', vaw)
    return (
      <div className="mb7">
        <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
          <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
            Violence Against Women for {startCase(param)} reported by{' '}
            {placeDisplay}, {since}–{until}
          </h2>
          <div>
            <div>
              {hasNoNibrsValues ? (
                <NoData text={noNibrsDataText} />
              ) : (
                <VAWChart
                  crime={param}
                  data={nibrsDataClean}
                  since={since}
                  submitsNibrs
                  until={until}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

VAWContainer.propTypes = {
  vaw: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool
  }),
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  states: PropTypes.object.isRequired
}

const mapStateToProps = ({ vaw, filters, states }) => {
  const { since, until, param } = filters
  const { place, placeType, pageType } = getPlaceInfo(filters)

  return {
    param,
    place,
    placeType,
    since,
    until,
    vaw,
    states,
    pageType
  }
}

export default connect(mapStateToProps)(VAWContainer)
