import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import NibrsCard from '../components/nibrs/NibrsCard'
import NibrsIntro from '../components/nibrs/NibrsIntro'
import { NibrsTerm } from '../components/Terms'
import parseNibrsCounts from '../util/nibrsCounts'
import { getAgency, oriToState } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import ucrParticipation from '../util/participation'
import lookupUsa from '../util/usa'

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
      const year = parseInt(d.data_year, 10)
      return year >= since && year <= until
    })
  })
  return filtered
}

const NibrsContainer = ({
  agency,
  crime,
  isAgency,
  nibrsCounts,
  participation,
  place,
  placeType,
  since,
  until,
}) => {
  const placeDisplay = isAgency ? agency.display : lookupUsa(place).display
  const nibrsFirstYear = initialNibrsYear({ place, placeType, since })
  const { data, error } = nibrsCounts

  const isReady = nibrsCounts.loaded
  const isLoading = nibrsCounts.loading
  let totalCount = 0
  let content = null


  if (error) content = <ErrorCard error={error} />
  else if (isReady) {
    const filteredData = filterNibrsData(data, { since, until })

    const dataParsed = parseNibrsCounts(filteredData, crime)
     const offenseObj = dataParsed
      .find(d => d.title === 'Offenses')

    totalCount = offenseObj.data.count
    content = (
      <div className="clearfix mxn1">
        {dataParsed.filter(d => d.title !== 'Offenses').map((d, i) => {
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
        <h2 className="mt0 mb2 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} incident details reported by {placeDisplay}
        </h2>
        {isLoading && <Loading />}
       {isReady &&
         <NibrsIntro
           crime={crime}
           isAgency={isAgency}
           nibrsFirstYear={nibrsFirstYear}
           participation={participation}
           place={place}
           placeDisplay={placeDisplay}
           totalCount={totalCount}
           until={until}
            />}
      </div>
      {content}
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

NibrsContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  nibrsCounts: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  participation: PropTypes.array.isRequired,
  until: PropTypes.number.isRequired,
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
