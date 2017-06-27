import { format } from 'd3-format'
import startCase from 'lodash.startcase'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import NibrsCard from '../components/NibrsCard'
import { nibrsTerm } from '../components/Terms'
import parseNibrs from '../util/nibrs'
import { getAgency, oriToState } from '../util/ori'
import { getPlaceInfo } from '../util/place'
import ucrParticipation, { shouldFetchNibrs as shouldShowNibrs } from '../util/ucr'

const formatNumber = format(',')

const highlight = txt => <strong>{txt}</strong>
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

const NibrsContainer = ({
  agency,
  crime,
  isAgency,
  nibrs,
  place,
  placeType,
  since,
  until,
}) => {
  if (isAgency && !agency) return null

  const showNibrs = isAgency
    ? agency.nibrs_months_reported === 12
    : shouldShowNibrs({ crime, place, placeType })

  if (!showNibrs) return null

  const placeDisplay = isAgency ? agency.display : startCase(place)
  const nibrsFirstYear = initialNibrsYear({ place, placeType, since })
  const { data, error, loading } = nibrs
  let [totalCount, content] = [0, null]

  if (!loading && data) {
    const filteredData = filterNibrsData(data, { since, until })
    const dataParsed = parseNibrs(filteredData)
    totalCount = filteredData.offenderRaceCode.reduce((a, b) => a + b.count, 0)
    content = (
      <div className="clearfix mxn1">
        {dataParsed.map((d, i) =>
          <div
            key={i}
            className={`col col-12 sm-col-6 mb2 px1 ${i % 2 === 0
              ? 'clear-left'
              : ''}`}
          >
            <NibrsCard
              crime={crime}
              place={place}
              placeType={placeType}
              since={nibrsFirstYear}
              until={until}
              {...d}
            />
          </div>,
        )}
      </div>
    )
  } else if (error) {
    content = <ErrorCard error={error} />
  }

  return (
    <div className="mb6">
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb1 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} incident details reported by {placeDisplay}
        </h2>
        {!error &&
          data &&
          (isAgency
            ? <p className="m0 sm-col-9">
                This agency reported {highlight(formatNumber(totalCount))}{' '}
                individual {crime} {pluralize('incident', totalCount)} to the
                FBI between {highlight(nibrsFirstYear)} and {highlight(until)}.
              </p>
            : <p className="m0 sm-col-9">
                There were {highlight(formatNumber(totalCount))} individual{' '}
                {crime} incidents reported to the FBI in {placeDisplay}{' '}
                between {highlight(nibrsFirstYear)} and {highlight(until)}{' '}
                by law enforcement agencies reporting {nibrsTerm}.
              </p>)}
        {loading && <Loading />}
      </div>
      {content}
      {!loading &&
        <div className="serif italic fs-12">
          Source: Reported {nibrsTerm} data from {placeDisplay},{' '}
          {nibrsFirstYear}–{until}.
        </div>}
    </div>
  )
}

NibrsContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  nibrs: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, nibrs }) => {
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  return {
    ...filters,
    agency,
    isAgency,
    place,
    placeType,
    nibrs,
  }
}

export default connect(mapStateToProps)(NibrsContainer)
