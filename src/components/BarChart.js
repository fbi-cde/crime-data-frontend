import { extent, max } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { timeParse } from 'd3-time-format'
import React from 'react'

import XAxis from './XAxis'
import YAxis from './YAxis'

const BarChart = ({
  size = { width: 600, height: 400 },
  margin = { top: 20, right: 20, bottom: 30, left: 50 },
  labels = true,
  data,
}) => {
  const height = size.height - margin.top - margin.bottom
  const parse = timeParse('%Y-%m-%d')
  const dataClean = data.map(d => ({ date: parse(d[0]), value: +d[1] }))
  const width = size.width - margin.left - margin.right

  const x = scaleTime()
      .domain(extent(dataClean, d => d.date))
      .range([0, width])

  const y = scaleLinear()
      .domain([0, max(dataClean, d => d.value)])
      .range([height, 0])

  const text = (!labels) ? '' : dataClean.map(d => (
    <text key={`${d.date}-text`} x={x(d.date) - 5} y={y(d.value) - 5} >
      {d.value}
    </text>
  ))

  return (
    <svg width={size.width} height={size.height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis scale={x} height={height} tickCt={dataClean.length} />
        <YAxis scale={y} />
        {dataClean.map(d => (
          <g key={d.date}>
            <rect
              x={x(d.date) - 5}
              y={y(d.value)}
              height={height - y(d.value)}
              width='10'
              fill='rebeccapurple'
            />
            {text}
          </g>
        ))}
      </g>
    </svg>
  )
}

export default BarChart
