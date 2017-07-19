import { max } from 'd3-array'
import lowerCase from 'lodash.lowercase'
import snakeCase from 'lodash.snakecase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import Sparkline from '../components/Sparkline'
import { oriToState } from '../util/agencies'
import { nationalKey } from '../util/usa'

const SparklineContainer = ({ crime, since, summaries, until, usState }) => {
  const { data, error, loading } = summaries
  const normalizedCrime = crime === 'rape' ? 'rape_legacy' : crime

  if (error) return <ErrorCard error={error} />

  const filterYears = d => d.year >= since && d.year <= until
  const computeRate = d => ({
    rate: d[snakeCase(normalizedCrime)] * 10000 / d.population,
    year: d.year,
  })

  const sparklines = [
    {
      data: data[usState] || [],
      place: usState,
      url: `/explorer/state/${usState}/${crime}`,
    },
    {
      data: data[nationalKey] || [],
      place: 'United States',
      url: `/explorer/${crime}`,
    },
  ]

  const yMax = max(
    sparklines.map(s => s.data).reduce((a, n) => [...a, ...n]),
    d => d.rate,
  )

  return (
    <div className="mb4">
      <h3 className="mt0 mb2 fs-18">
        State and national {lowerCase(crime)} rates
      </h3>
      <div className="clearfix mxn1">
        {sparklines.map((s, i) =>
          <div className="sm-col sm-col-6 mb1 px1" key={i}>
            <div className="p2 bg-blue-lighter flex items-center">
              <div className="flex-none">
                <h4 className="m0 sans-serif fs-14">{startCase(s.place)}</h4>
                <p className="mb2 mw8 fs-14">
                  {startCase(crime)},{' '}
                  <span className="nowrap">{since}-{until}</span>
                </p>
                <a
                  className="block btn btn-sm btn-primary fs-12 regular center"
                  href={s.url}
                >
                  Explore{' '}
                  {s.place === 'United States' ? 'national' : 'state'}{' '}
                  data
                </a>
              </div>
              <div className="pl1 sm-pl2 flex-auto center">
                {loading
                  ? <Loading slim />
                  : <Sparkline
                      data={s.data.filter(filterYears).map(computeRate)}
                      yMax={yMax}
                    />}
              </div>
            </div>
          </div>,
        )}
      </div>
      <p className="mt1 mb0 fs-12 serif italic">
        Rates are only available for state and national-level data.
      </p>
    </div>
  )
}

SparklineContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summaries: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
  usState: PropTypes.string.isRequired,
}

const mapStateToProps = ({ filters, summaries }) => ({
  ...filters,
  usState: oriToState(filters.place),
  summaries,
})

export default connect(mapStateToProps)(SparklineContainer)
