import { extent, histogram, max } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import React from 'react'

import XAxis from './XAxis'

const Histogram = ({
  size = { width: 360, height: 160 },
  margin = { top: 20, right: 20, bottom: 30, left: 20 },
  fill = '#ff5e50',
  data,
}) => {
  const height = size.height - margin.top - margin.bottom
  const width = size.width - margin.left - margin.right

  const dataClean = data.map(d => ({ key: d[0], value: +d[1] }))

  const x = scaleLinear()
      .domain(extent(dataClean, d => d.value))
      .range([0, width])

  const hist = histogram()
      .domain(x.domain())
      .value(d => d.value)

  const bins = hist(dataClean)

  const y = scaleLinear()
      .domain([0, max(bins, d => d.length)])
      .range([height, 0])

  return (
    <div>
      <svg
        preserveAspectRatio='xMidYMid'
        viewBox={`0 0 ${size.width} ${size.height}`}
        style={{ width: '100%', height: '100%' }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {bins.map((d, i) => (
            <g key={i} transform={`translate(${x(d.x0)}, ${y(d.length)})`}>
              <rect
                x='1'
                width={x(bins[0].x1) - x(bins[0].x0) - 1}
                height={height - y(d.length)}
                fill={fill}
              />
            </g>
          ))}
          <XAxis scale={x} height={height} />
        </g>
      </svg>
      <div className='mt1'>
        In 2014, there were <span className='bold red'>3,000</span> incidents
        involving victims <span className='bold red'>ages 20-24</span>.
      </div>
    </div>
  )
}

export default Histogram
