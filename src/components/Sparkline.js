import { extent, max, min } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { curveCardinal, line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import PropTypes from 'prop-types'
import React from 'react'

const parse = timeParse('%Y')

const Sparkline = ({ data, yMax }) => {
  const [margin, height, width] = [8, 60, 180]
  const clean = data.map(d => Object.assign({ date: parse(d.year), ...d }))

  const domain = [min(clean, d => d.rate), yMax || max(clean, d => d.rate)]

  const x = scaleTime()
    .domain(extent(clean, d => d.date))
    .range([0, width - margin * 2])

  const y = scaleLinear().domain(domain).range([height - margin * 2, 0]).nice()

  const l = line().curve(curveCardinal).x(d => x(d.date)).y(d => y(d.rate))

  return (
    <svg width={width} height={height} style={{ maxWidth: '100%' }}>
      <g transform={`translate(${margin}, ${margin})`}>
        <path d={l(clean)} fill="none" stroke="#ff5e50" strokeWidth="3" />
      </g>
    </svg>
  )
}

Sparkline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  yMax: PropTypes.number,
}

export default Sparkline
