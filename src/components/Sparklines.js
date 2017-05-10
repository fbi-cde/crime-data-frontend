import { extent, max, min } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import lowerCase from 'lodash.lowercase'
import snakeCase from 'lodash.snakecase'
import startCase from 'lodash.startcase'
import React from 'react'

import { slugify } from '../util/text'
import lookupUsa, { nationalKey } from '../util/usa'

const parse = timeParse('%Y')

const Sparkline = ({ data }) => {
  const clean = data.map(d => Object.assign({ date: parse(d.year), ...d }))
  const maxValue = max(clean, d => d.rate)
  const x = scaleTime().domain(extent(clean, d => d.date)).range([0, 100])
  const y = scaleLinear().domain([0, maxValue]).range([50, 0]).nice()

  const l = line().x(d => x(d.date)).y(d => y(d.rate))

  return (
    <svg>
      <g>
        <path d={l(clean)} fill="none" stroke="#ff5e50" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

const Sparklines = ({ crime, place, since, summaries, until }) => {
  const { data, loading } = summaries
  const state = place.slice(0, 2)
  const stateName = lookupUsa(state)

  const filterByYears = d => d.year >= since && d.year <= until
  const mapCrime = d => ({
    rate: d[snakeCase(crime)] * 10000 / d.population,
    year: d.year,
  })

  if (loading || !data) return null

  return (
    <div className="mb4">
      <h3>State and national crime rates</h3>
      <div className="clearfix fs-10">
        <div className="sm-col sm-col-6 flex px1">
          <div className="flex-grow">
            <h4>{startCase(stateName)} {lowerCase(crime)}</h4>
            <p>{since} - {until}</p>
            <a
              className="btn"
              href={`/explorer/state/${slugify(stateName)}/${crime}`}
            >
              Explore state data
            </a>
          </div>
          <div className="flex-grow">
            <Sparkline data={data[state].map(mapCrime).filter(filterByYears)} />
          </div>
        </div>
        <div className="sm-col sm-col-6 px1">
          <h4>U.S. {lowerCase(crime)}</h4>
          <p>{since} - {until}</p>
          <a href={`/explorer/${crime}`}>Explore national data</a>
          <Sparkline
            data={data[nationalKey].map(mapCrime).filter(filterByYears)}
          />
        </div>
      </div>
      <div className="clearfix mxn1 fs-10">
        <div className="sm-col sm-col-6 px1">
          <div className="p2 bg-white">
            <pre>{JSON.stringify(data[state], null, 2)}</pre>
          </div>
        </div>
        <div className="sm-col sm-col-6 px1">
          <div className="p2 bg-white">
            <pre>{JSON.stringify(data[nationalKey], null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sparklines
