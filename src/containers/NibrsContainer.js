import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import NibrsCard from '../components/NibrsCard'
import NibrsIntro from '../components/NibrsIntro'
import { nibrsTerm } from '../components/Terms'
import parseNibrs from '../util/nibrs'
import { getAgency, oriToState } from '../util/ori'
import { getPlaceInfo } from '../util/place'
import ucrParticipation, {
  shouldFetchNibrs as shouldShowNibrs,
} from '../util/participation'

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
  participation,
  place,
  placeType,
  since,
  until,
}) => {
  if (
    (isAgency && (!agency || agency.nibrs_months_reported !== 12)) ||
    !shouldShowNibrs({ crime, place, placeType })
  ) {
    return null
  }

  const placeDisplay = isAgency ? agency.display : startCase(place)
  const nibrsFirstYear = initialNibrsYear({ place, placeType, since })
  const { data, error } = nibrs

  const isLoading = isAgency
    ? nibrs.loading
    : nibrs.loading || participation.loading
  const isReady = !isLoading && error === null && !!data

  let totalCount = 0
  let content = null

  if (error) content = <ErrorCard error={error} />
  else if (isReady) {
    const filteredData = filterNibrsData(data, { since, until })
    const dataParsed = parseNibrs(filteredData)

    totalCount = filteredData.offenderRaceCode.reduce((a, b) => a + b.count, 0)
    content = (
      <div className="clearfix mxn1">
        {dataParsed.map((d, i) => {
          const cls = i % 2 === 0 ? 'clear-left' : ''
          return (
            <div key={i} className={`col col-12 sm-col-6 mb2 px1 ${cls}`}>
              <NibrsCard
                crime={crime}
                place={place}
                placeType={placeType}
                since={nibrsFirstYear}
                until={until}
                {...d}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mb6">
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb1 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} incident details reported by {placeDisplay}
        </h2>
        {isLoading && <Loading />}
        {isReady &&
          <NibrsIntro
            crime={crime}
            isAgency={isAgency}
            nibrsFirstYear={nibrsFirstYear}
            place={place}
            placeDisplay={placeDisplay}
            totalCount={totalCount}
            participation={participation}
            until={until}
          />}
      </div>
      {content}
      {isReady &&
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
    loading: PropTypes.bool,
  }).isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  participation: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, nibrs, participation }) => {
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
    participation,
  }
}

export default connect(mapStateToProps)(NibrsContainer)
