import { extent } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import React from 'react'

const TimeSeriesChart = ({
  width = 600,
  height = 400,
  data,
}) => {
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
    <svg width={width} height={height}>
      <path
        d={l(dataClean)}
        fill='none'
        stroke='steelblue'
        strokeWidth={1.5}
      />
    </svg>
  )
}

export default TimeSeriesChart
