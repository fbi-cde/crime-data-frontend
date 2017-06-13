import { max } from 'd3-array'
import lowerCase from 'lodash.lowercase'
import snakeCase from 'lodash.snakecase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import Loading from './Loading'
import Sparkline from './Sparkline'
import { oriToState } from '../util/ori'
import { nationalKey } from '../util/usa'

const SparklineContainer = ({ crime, since, summaries, until, usState }) => {
  const { data, loading } = summaries
  const normalizedCrime = crime === 'rape' ? 'rape_legacy' : crime

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
        {sparklines.map((s, i) => (
          <div className="sm-col sm-col-6 mb1 px1" key={i}>
            <div className="p2 bg-blue-lighter flex flex-wrap">
              <div>
                <h4 className="mb0 sans-serif fs-14">{startCase(s.place)}</h4>
                <p className="mb2 fs-14">{startCase(crime)}, {since}-{until}</p>
              </div>
              <div className="flex-auto flex-basis-50 center">
                {loading
                  ? <Loading slim />
                  : <Sparkline
                      data={s.data.filter(filterYears).map(computeRate)}
                      yMax={yMax}
                    />}
              </div>
              <div className="sm-flex-basis-100">
                <a
                  className="btn btn-sm btn-primary fs-12 regular"
                  href={s.url}
                >
                  Explore{' '}
                  {s.place === 'United States' ? 'national' : 'state'}{' '}
                  data
                </a>
              </div>
            </div>
          </div>
        ))}
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
