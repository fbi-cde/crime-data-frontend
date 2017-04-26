import { max } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import React from 'react'

import XAxis from './XAxis'
import YAxis from './YAxis'

const BarChart = ({
  size = { width: 600, height: 400 },
  margin = { top: 20, right: 20, bottom: 30, left: 50 },
  labels = true,
  fill = 'firebrick',
  data,
}) => {
  const height = size.height - margin.top - margin.bottom
  const dataClean = data.map(d => ({ key: d[0], value: +d[1] }))
  const width = size.width - margin.left - margin.right

  const x = scaleBand()
    .domain(dataClean.map(d => d.key))
    .rangeRound([0, width])
    .padding(0.1)

  const y = scaleLinear()
    .domain([0, max(dataClean, d => d.value)])
    .range([height, 0])

  return (
    <svg width={size.width} height={size.height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <XAxis scale={x} height={height} tickCt={dataClean.length} />
        <YAxis scale={y} />
        {dataClean.map(d => (
          <g key={d.key} className="bar">
            <rect
              x={x(d.key)}
              y={y(d.value)}
              height={height - y(d.value)}
              width={x.bandwidth()}
              fill={fill}
            />
            {!labels
              ? ''
              : <text x={x(d.key) + x.bandwidth() / 2} y={y(d.value) - 5}>
                  {d.value}
                </text>}
          </g>
        ))}
      </g>
    </svg>
  )
}

export default BarChart
