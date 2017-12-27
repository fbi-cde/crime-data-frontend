import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import lookupUsa from '../util/usa'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import parseSHRCounts from '../util/shrCounts'
import ExpandedHomicideCard from '../components/shr/ExpandedHomicideCard'
import SHRIntro from '../components/shr/SHRIntro'
import { getPlaceInfo } from '../util/place'
import { SHRTerm } from '../components/Terms'

const shouldShowSHR = crime => {
  if (crime === 'homicide') {
    return true;
  }
  return false;
}

const filterSHRData = (data, { since, until }) => {
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

const SHRContainer = ({
  agency,
  crime,
  isAgency,
  shrCounts,
  place,
  placeType,
  participation,
  since,
  until,
}) => {
  console.log('SHRContainer:', crime)
  if ((isAgency) || !shouldShowSHR(crime)) { return null }

  console.log('SHRContainer II')

  const placeDisplay = isAgency ? agency.display : lookupUsa(place).display
  const { data, error } = shrCounts

  const isReady = shrCounts.loaded
  const isLoading = shrCounts.loading
  const totalCount = 0
  let content = null


  if (error) content = <ErrorCard error={error} />
  else if (isReady) {
    const filteredData = filterSHRData(data, { since, until })

    const dataParsed = parseSHRCounts(filteredData)

    /*
    totalCount = offenseObj.data.count
    let displayCards = true
    if (totalCount === 0) { displayCards = false }
    */
    content = (
      <div className="clearfix mxn1">
        {dataParsed.map((d, i) => {
          const cls = i % 2 === 0 ? 'clear-left' : ''
          return (
            <div key={i} className={`col col-12 sm-col-6 mb2 px1 ${cls}`}>
              <ExpandedHomicideCard
                crime={crime}
                place={place}
                placeType={placeType}
                since={since}
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
          <SHRTerm /> details reported by {placeDisplay}
        </h2>
        {isLoading && <Loading />}
       {isReady &&
         <SHRIntro
           crime={crime}
           isAgency={isAgency}
           since={since}
           place={place}
           placeDisplay={placeDisplay}
           totalCount={totalCount}
           until={until}
           participation={participation}
            />}
      </div>
      {content}
    </div>
  )
}

SHRContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  shrCounts: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  participation: PropTypes.array.isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ filters, shrCounts, participation }) => {
  const { since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'

  let filteredParticipation = []
  if (participation.data[place]) {
    filteredParticipation = participation.data[place].filter(
      p => p.year >= since && p.year <= until,
    )
  }

  return {
    ...filters,
    isAgency,
    place,
    placeType,
    shrCounts,
    participation: filteredParticipation,
  }
}

export default connect(mapStateToProps)(SHRContainer)
