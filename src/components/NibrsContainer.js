import { format } from 'd3-format'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ErrorCard from './ErrorCard'
import Loading from './Loading'
import NibrsCard from './NibrsCard'
import Term from './Term'
import parseNibrs from '../util/nibrs'
import { getAgency, oriToState } from '../util/ori'
import { getPlaceInfo } from '../util/place'
import ucrParticipation from '../util/ucr'

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

const NibrsContainer = ({
  agency,
  crime,
  nibrs,
  place,
  placeType,
  since,
  until,
}) => {
  const { data, error, loading } = nibrs

  const nibrsFirstYear = initialNibrsYear({ place, placeType, since })
  const nibrsTerm = (
    <Term id="national incident-based reporting system (NIBRS)">
      incident-based (NIBRS)
    </Term>
  )

  let [totalCount, content] = [0, <Loading />]
  if (!loading && data) {
    const filteredData = filterNibrsData(data, { since, until })
    const dataParsed = parseNibrs(filteredData)
    totalCount = filteredData.offenderRaceCode.reduce((a, b) => a + b.count, 0)
    content = (
      <div className="clearfix mxn1">
        {dataParsed.map((d, i) => (
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
    )
  } else if (error) {
    content = <ErrorCard error={error} />
  }

  const placeDisplay = placeType === 'agency'
    ? agency.display
    : startCase(place)

  return (
    <div className="mb8">
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb1 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} incident details reported by {placeDisplay}
        </h2>
        {nibrsFirstYear !== since &&
          <p className="my-tiny">
            {startCase(place)} started reporting {nibrsTerm} data
            to the FBI in {nibrsFirstYear}.
          </p>}
        {!error &&
          data &&
          <p className="m0 sm-col-9">
            There were <strong>{formatNumber(totalCount)}</strong> incidents
            of {crime} reported to the UCR Program between {nibrsFirstYear}{' '}
            and {until}. Learn more about the{' '}
            <a className="underline" href={fbiLink}>FBI’s data collections</a>.
          </p>}
      </div>
      {content}
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
  const agency = placeType === 'agency' && getAgency(agencies, place)

  return {
    ...filters,
    agency,
    place,
    placeType,
    nibrs,
  }
}

export default connect(mapStateToProps)(NibrsContainer)
