import { extent } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import React from 'react'

import XAxis from './XAxis'
import YAxis from './YAxis'

const TimeChart = ({
  size = { width: 600, height: 400 },
  margin = { top: 20, right: 20, bottom: 30, left: 50 },
  data,
}) => {
  const width = size.width - margin.left - margin.right
  const height = size.height - margin.top - margin.bottom

  const parse = timeParse('%Y-%m-%d')
  const dataClean = data.map(d => ({ date: parse(d[0]), value: +d[1] }))

  const x = scaleTime()
      .domain(extent(dataClean, d => d.date))
      .range([0, width])

  const y = scaleLinear()
      .domain(extent(dataClean, d => d.value))
      .range([height, 0])

  const l = line()
      .x(d => x(d.date))
      .y(d => y(d.value))

  return (
    <svg width={size.width} height={size.height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis scale={x} height={height} tickCt={4} />
        <YAxis scale={y} />
        <path
          d={l(dataClean)}
          fill='none'
          stroke='tomato'
          strokeWidth={3}
        />
        {dataClean.map((d, i) => (
          <circle
            key={i}
            cx={x(d.date)}
            cy={y(d.value)}
            fill='tomato'
            r={5}
          />
        ))}
      </g>
    </svg>
  )
}

TimeChart.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
}

export default TimeChart
