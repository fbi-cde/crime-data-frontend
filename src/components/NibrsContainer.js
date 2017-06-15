import { format } from 'd3-format'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ErrorCard from './ErrorCard'
import Loading from './Loading'
import NibrsCard from './NibrsCard'
import NoData from './NoData'
import { nibrsTerm } from './Terms'
import parseNibrs from '../util/nibrs'
import { getAgency, oriToState } from '../util/ori'
import { getPlaceInfo } from '../util/place'
import ucrParticipation, {
  shouldFetchNibrs as shouldShowNibrs,
} from '../util/ucr'

const fbiLink = 'https://ucr.fbi.gov/ucr-program-data-collections'
const formatNumber = format(',')

const initialNibrsYear = ({ place, placeType, since }) => {
  const placeNorm = placeType === 'agency' ? oriToState(place) : place
  const participation = ucrParticipation(placeNorm)
  const initYear = participation && participation.nibrs['initial-year']

  if (initYear && initYear > since) return initYear
  return since
}

const filterNibrsData = (data, { since, until }) => {
  if (!data) return false

  const filtered = {}
  Object.keys(data).forEach(key => {
    filtered[key] = data[key].filter(d => {
      const year = parseInt(d.year, 10)
      return year >= since && year <= until
    })
  })

  return filtered
}

const NibrsContainerText = ({
  crime,
  firstYear,
  place,
  showNoData,
  since,
  totalCount,
  until,
}) => {
  const text =
    'There were no homicide incidents reported during this time period.'
  return (
    <div>
      {firstYear !== since &&
        <p className="my-tiny">
          {startCase(place)} started reporting {nibrsTerm} data
          to the FBI in {firstYear}.
        </p>}
      {typeof totalCount === 'number' &&
        !showNoData &&
        <p className="m0 sm-col-9">
          There were <strong>{formatNumber(totalCount)}</strong> incidents
          of {crime} reported to the UCR Program between {firstYear}{' '}
          and {until}. Learn more about the{' '}
          <a className="underline" href={fbiLink}>FBI’s data collections</a>.
        </p>}
      {showNoData && <NoData text={text} />}
    </div>
  )
}

const NibrsContainer = ({
  crime,
  data,
  error,
  loading,
  reportsNibrs,
  place,
  placeDisplay,
  placeType,
  since,
  summaryHidden,
  until,
}) => {
  if (!reportsNibrs) return null

  const filteredData = filterNibrsData(data, { since, until })
  const totalCount = filteredData.offenderRaceCode
    ? filteredData.offenderRaceCode.reduce((a, b) => a + b.count, 0)
    : null

  const nibrsFirstYear = initialNibrsYear({ place, placeType, since })

  return (
    <div className="mb8">
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb1 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} incident details reported by {placeDisplay}
        </h2>
        {loading && <Loading />}
        {!loading &&
          <NibrsContainerText
            crime={crime}
            firstYear={nibrsFirstYear}
            place={place}
            showNoData={summaryHidden}
            since={since}
            totalCount={totalCount}
            until={until}
          />}
      </div>
      {error && <ErrorCard error={error} />}
      {!loading && !summaryHidden && (!loading && data)
        ? <div className="clearfix mxn1">
            {parseNibrs(filteredData).map((d, i) => (
              <div
                key={i}
                className={`lg-col lg-col-6 mb2 px1 ${i % 2 === 0 ? 'clear-left' : ''}`}
              >
                <NibrsCard
                  crime={crime}
                  place={place}
                  placeType={placeType}
                  since={nibrsFirstYear}
                  until={until}
                  {...d}
                />
              </div>
            ))}
          </div>
        : null}
      {/* TODO: refactor this into a common source text component */}
      {!loading &&
        <div className="mt2 serif italic fs-12">
          Source: Reported {nibrsTerm} data from {placeDisplay},{' '}
          {nibrsFirstYear}–{until}.
        </div>}
    </div>
  )
}

NibrsContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  data: PropTypes.object,
  loading: PropTypes.boolean,
  place: PropTypes.string.isRequired,
  placeDisplay: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summaryHidden: PropTypes.bool,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, nibrs, summaries }) => {
  const { crime } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && getAgency(agencies, place)
  const loading = isAgency ? nibrs.loading || summaries.loading : nibrs.loading
  const placeDisplay = placeType === 'agency'
    ? agency.display
    : startCase(place)
  const reportsNibrs = placeType !== 'agency'
    ? shouldShowNibrs({ crime, place, placeType })
    : agency.nibrs_months_reported === 12
  const summary = summaries.data[place]
  const summaryHidden =
    placeType === 'agency' &&
    summary &&
    summary.length ===
      summary.filter(d => d.reported === 0 && d.cleared === 0).length

  return {
    ...filters,
    ...nibrs,
    loading,
    reportsNibrs,
    placeDisplay,
    summaryHidden,
  }
}

export default connect(mapStateToProps)(NibrsContainer)
