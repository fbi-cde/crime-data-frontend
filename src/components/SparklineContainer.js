import { max } from 'd3-array'
import snakeCase from 'lodash.snakecase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import Loading from './Loading'
import Sparkline from './Sparkline'
import { slugify } from '../util/text'
import lookupUsa, { nationalKey } from '../util/usa'

const SparklineContainer = ({
  crime,
  place,
  since,
  summaries,
  until,
  usState,
}) => {
  const { data, loading } = summaries

  const filterYears = d => d.year >= since && d.year <= until
  const computeRate = d => ({
    rate: d[snakeCase(crime)] * 10000 / d.population,
    year: d.year,
  })

  const sparklines = [
    {
      data: data ? data[slugify(usState)] : [],
      place: usState,
      url: `/explorer/state/${slugify(usState)}/${crime}`,
    },
    {
      data: data ? data[nationalKey] : [],
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
      <h3 className="mt0 mb2 fs-18">State and national crime rates</h3>
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
                  Explore{' '}
                  {s.place === 'United States' ? 'national' : 'state'}{' '}
                  data
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
      <p className="mt1 mb0 fs-12 serif italic">
        Rates are only available for state and national-level data.
      </p>
    </div>
  )
}

SparklineContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
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
  usState: lookupUsa(filters.place.slice(0, 2)),
  summaries,
})

export default connect(mapStateToProps)(SparklineContainer)
