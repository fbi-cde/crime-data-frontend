import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import offenses from '../util/offenses'
import { getAgency } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import usa from '../util/usa'

const clean = (val, alt) => {
  const yr = +val
  return yr >= 1960 && yr <= 2014 ? yr : alt
}

const SharingTags = ({ agency, crime, location, place }) => {
  const { pathname, query } = location
  const since = clean(query.since)
  const until = clean(query.until, 2014)
  const placeDisplay = agency ? agency.agency_name : startCase(place)
  const title = pathname.includes('/explorer/')
    ? `${startCase(
        crime,
      )} offenses reported by ${placeDisplay}, ${since}–${until}`
    : 'FBI Crime Data Explorer'

  return (
    <div>
      <Helmet>
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="The Crime Data Explorer publishes nationwide crime data collected by the FBI in an open and accessible format. The tool allows you to view trends and download bulk data allowing you to get a better understanding of crime across the country."
        />
        <meta
          property="og:image"
          content="https://crime-data-explorer.fr.cloud.gov/img/cde-logo.png"
        />

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
}

const mapStateToProps = ({ agencies, filters }) => {
  const { crime } = filters
  const { place, placeType } = getPlaceInfo(filters)
  const isAgency = placeType === 'agency'
  const agency = isAgency && getAgency(agencies, place)
  const isKnownCrime = crime && offenses.includes(crime)
  const isKnownPlace = place && usa(place)

  return {
    agency,
    crime: isKnownCrime ? crime : false,
    place: isKnownPlace ? place : false,
  }
}

export default withRouter(connect(mapStateToProps)(SharingTags))
