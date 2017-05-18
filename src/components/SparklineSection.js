import snakeCase from 'lodash.snakecase'
import React from 'react'

import SparklineContainer from './SparklineContainer'
import { slugify } from '../util/text'
import lookupUsa, { nationalKey } from '../util/usa'

const SparklineSection = ({ crime, place, since, summaries, until }) => {
  const { data, loading } = summaries

  if (loading || !data) return null

  const filterYears = d => d.year >= since && d.year <= until
  const computeRate = d => ({
    rate: d[snakeCase(crime)] * 10000 / d.population,
    year: d.year,
  })

  const state = lookupUsa(place.slice(0, 2))
  const stateData = data[slugify(state)].filter(filterYears).map(computeRate)
  const NationalData = data[nationalKey].filter(filterYears).map(computeRate)

  return (
    <div className="mb4">
      <h3>State and national crime rates</h3>
      <div className="clearfix mxn1">
        <div className="sm-col sm-col-6 mb1 px1">
          <SparklineContainer
            crime={crime}
            data={stateData}
            place={state}
            since={since}
            until={until}
          />
        </div>
        <div className="sm-col sm-col-6 mb1 px1">
          <SparklineContainer
            crime={crime}
            data={NationalData}
            place="US"
            since={since}
            until={until}
          />
        </div>
      </div>
    </div>
  )
}

export default SparklineSection
