import { max } from 'd3-array'
import snakeCase from 'lodash.snakecase'
import startCase from 'lodash.startcase'
import React from 'react'
import { connect } from 'react-redux'

import Loading from './Loading'
import Sparkline from './Sparkline'
import { slugify } from '../util/text'
import lookupUsa, { nationalKey } from '../util/usa'

const SparklineContainer = ({ crime, place, since, summaries, until }) => {
  const { data, loading } = summaries

  const filterYears = d => d.year >= since && d.year <= until
  const computeRate = d => ({
    rate: d[snakeCase(crime)] * 10000 / d.population,
    year: d.year,
  })

  const state = lookupUsa(place.slice(0, 2))
  const sparklines = [
    {
      data: data ? data[slugify(state)] : [],
      place: state,
      url: `/explorer/state/${slugify(state)}/${crime}`,
    },
    {
      data: data ? data[nationalKey] : [],
      place: 'US',
      url: `/explorer/${crime}`,
    },
  ]
  const yMax = max(
    sparklines.map(s => s.data).reduce((a, n) => [...a, ...n]),
    d => d.rate,
  )

  return (
    <div className="mb4">
      <h3>State and national crime rates</h3>
      <div className="clearfix mxn1">
        {sparklines.map((s, i) => (
          <div className="sm-col sm-col-6 mb1 px1" key={i}>
            <div className="p2 bg-blue-lighter flex items-center">
              <div>
                <h4 className="m0 sans-serif fs-14">{startCase(s.place)}</h4>
                <p className="mb2 fs-14">{startCase(crime)}, {since}-{until}</p>
                <a
                  className="btn btn-sm btn-primary fs-12 regular"
                  href={s.url}
                >
                  Explore {s.place === 'US' ? 'national' : 'state'} data
                </a>
              </div>
              <div className="flex-auto center">
                {loading
                  ? <Loading slim />
                  : <Sparkline
                      data={s.data.filter(filterYears).map(computeRate)}
                      yMax={yMax}
                    />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({ crime, place, since, summaries, until }) => ({
  crime,
  place,
  since,
  summaries,
  until,
})

export default connect(mapStateToProps)(SparklineContainer)
