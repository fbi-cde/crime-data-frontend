import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import offenses from '../util/offenses'
import { getAgency } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import usa from '../util/usa'

const SharingTags = ({ agency, crime, place, since, until }) => {
  const placeDisplay = agency ? agency.agency_name : startCase(place)
  const title = `${startCase(
    crime,
  )} offenses reported by ${placeDisplay}, ${since}–${until}`
  return (
    <div>
      <Helmet>
        <meta property="og:title" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@fbi" />
      </Helmet>
    </div>
  )
}

SharingTags.propTypes = {
  agency: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  crime: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  place: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  since: PropTypes.number,
  until: PropTypes.number,
}

const mapStateToProps = ({ agencies, filters }) => {
  const { crime, since, until } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && getAgency(agencies, place)
  const isKnownCrime = crime && offenses.includes(crime)
  const isKnownPlace = place && usa(place)

  return {
    agency,
    crime: isKnownCrime ? crime : false,
    place: isKnownPlace ? place : false,
    since,
    until,
  }
}

export default connect(mapStateToProps)(SharingTags)
