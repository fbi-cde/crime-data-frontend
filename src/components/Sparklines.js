import { extent, max } from 'd3-array'
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
  const margin = 10
  const height = 100
  const width = 200
  const clean = data.map(d => Object.assign({ date: parse(d.year), ...d }))
  const maxValue = max(clean, d => d.rate)
  const x = scaleTime()
    .domain(extent(clean, d => d.date))
    .range([0, width - margin * 2])
  const y = scaleLinear()
    .domain([0, maxValue])
    .range([height - margin * 2, 0])
    .nice()

  const l = line().x(d => x(d.date)).y(d => y(d.rate))

  return (
    <svg width={width} height={height} style={{ maxWidth: '100%' }}>
      <g transform={`translate(${margin}, ${height / 2})`}>
        <path d={l(clean)} fill="none" stroke="#ff5e50" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

const SparklineContainer = ({ crime, data, place, since, until }) => {
  const isNational = place === 'US'
  const exploreUrl = isNational
    ? `/explorer/${crime}`
    : `/explorer/state/${slugify(place)}/${crime}`
  return (
    <div className="bg-blue-lighter flex flex-justify pb2 px2">
      <div className="flex-grow">
        <h4 className="sans-serif fs-14">
          {startCase(place)} {lowerCase(crime)}
        </h4>
        <p className="fs-12">{since} - {until}</p>
        <a className="btn btn-primary px1 py0" href={exploreUrl}>
          Explore {isNational ? 'national' : 'state'} data
        </a>
      </div>
      <div className="flex-grow flex">
        <Sparkline data={data} />
      </div>
    </div>
  )
}

const Sparklines = ({ crime, place, since, summaries, until }) => {
  const { data, loading } = summaries
  const state = place.slice(0, 2)

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
        <div className="col col-12 sm-col sm-col-6 mb1 px0 sm-px1">
          <SparklineContainer
            crime={crime}
            data={data[state].map(mapCrime).filter(filterByYears)}
            place={lookupUsa(state)}
            since={since}
            until={until}
          />
        </div>
        <div className="col col-12 sm-col sm-col-6 mb1 px0 sm-px1">
          <SparklineContainer
            crime={crime}
            data={data[nationalKey].map(mapCrime).filter(filterByYears)}
            place="US"
            since={since}
            until={until}
          />
        </div>
      </div>
    </div>
  )
}

export default Sparklines
