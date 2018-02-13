import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import DisplayCard from '../components/graph/DisplayCard'
import NibrsIntro from '../components/nibrs/NibrsIntro'
import { NibrsTerm } from '../components/Terms'
import { getAgency, oriToState } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import lookupUsa from '../util/usa'
import { rangeYears } from '../util/years'

import ucrParticipation, {
  shouldFetchNibrs as shouldShowNibrs,
} from '../util/participation'

class NibrsContainer extends React.Component {

  constructor(props) {
    super(props)
    const { until } = props
    this.state = { yearSelected: until }
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  initialNibrsYear(place, placeType, since) {
    const placeNorm = placeType === 'agency' ? oriToState(place) : place
    const participation = ucrParticipation(placeNorm)
    const initYear = participation && participation.nibrs['initial-year']

    if (initYear && initYear > since) return initYear
    return since
  }

  getCards(data, place) {
    const cards = []
    let cnt = -1;
    Object.keys(data).forEach(d => {
      cnt += 1;
      const obj = data[d]
      if (d.includes('victim')) { obj.noun = `Victim ${obj.noun}` } else if (d.includes('offender')) { obj.noun = `Offender ${obj.noun}` }
      const cls = cnt % 2 === 0 ? 'clear-left' : ''
      if (d !== 'offenseCount') {
        cards.push(
        <div key={cnt} className={`col col-12 sm-col-6 mb2 px1 ${cls}`}>
          <DisplayCard
            data={obj}
            place={place}
            year={this.state.yearSelected}
          />
        </div>)
      }
    })

    return cards
}

  render() {
     const {
      agency,
      pageType,
      isAgency,
      nibrsCounts,
      participation,
      place,
      placeType,
      since,
      until,
      states,
    } = this.props

    if (
      (isAgency && (!agency || agency.nibrs_months_reported !== 12)) ||
      !shouldShowNibrs({ pageType, place, placeType }, states)
    ) {
      return null
    }

    const placeDisplay = isAgency ? agency.display : lookupUsa(place).display
    const nibrsFirstYear = this.initialNibrsYear(place, placeType, since)
    const { data, error } = nibrsCounts

    const isReady = nibrsCounts.loaded
    const isLoading = nibrsCounts.loading
    let totalCount = 0
    const yrRange = rangeYears(nibrsFirstYear, until);


    if (error) return (<ErrorCard error={error} />)
    if (isLoading) return (<Loading />)

    const countDataByYear = data.offenseCount.data.filter(d => d.data_year === this.state.yearSelected)
    totalCount = countDataByYear.filter(d => d.key === 'Incident Count')[0].value
    return (
        <div className="mb6">
          <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
            <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
              {startCase(pageType)} incident details reported by {placeDisplay}
            </h2>
            {isLoading && <Loading />}
            {isReady &&
              <div className='mb3'>
                <label htmlFor="year-selected" className="hide">
                  Year selected
                </label>
                <select
                  className="field field-sm select select-dark col-10"
                  id="year-selected"
                  onChange={this.updateYear}
                  value={this.state.yearSelected}
                >
                  {yrRange.map((y, i) =>
                    <option key={i}>
                      {y}
                    </option>,
                  )}
                </select>
              </div>
            }
            {isReady &&
              <NibrsIntro
                crime={pageType}
                isAgency={isAgency}
                participation={participation}
                place={place}
                placeDisplay={placeDisplay}
                totalCount={totalCount}
                selectedYear={this.state.yearSelected}
              />}
          </div>
          <div className="clearfix mxn1">
           {this.getCards(data, place)}
          </div>
          {isReady &&
            <div>
              <div className="serif italic fs-12">
                Source: Reported <NibrsTerm size="sm" /> data from {placeDisplay}.
              </div>
              <div className="serif italic fs-12">
                Footnotes:
              </div>
              <div className="serif italic fs-12">
                The complexity of NIBRS data presents unique impediments to interconnecting
                all facets of the information collected. In instances of multiple
                offenders, for example, the Crime Data Explorer currently links an offender
                to only one offense—the first listed. The same is true for incidents
                involving multiple victims. The Uniform Crime Reporting Program is
                working hard to improve these specific functions within the Crime Data
                Explorer so that presentations in the coming months will fully encompass
                all aspects of the NIBRS data.
              </div>
            </div>}
        </div>
      )
  }
}

NibrsContainer.propTypes = {
  pageType: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  nibrsCounts: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  participation: PropTypes.array.isRequired,
  until: PropTypes.number.isRequired,
  states: PropTypes.object.isRequired,
}


const mapStateToProps = ({ agencies, filters, nibrsCounts, participation }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  let filteredParticipation = []
  if (participation.data[place]) {
    filteredParticipation = participation.data[place].filter(
      p => p.year >= since && p.year <= until,
    )
  }

  return {
    ...filters,
    agency,
    isAgency,
    place,
    placeType,
    nibrsCounts,
    participation: filteredParticipation,
  }
}

export default connect(mapStateToProps)(NibrsContainer)
