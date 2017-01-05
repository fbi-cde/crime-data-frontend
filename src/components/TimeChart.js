/* eslint-disable react/jsx-no-bind */

import { bisector, extent, max } from 'd3-array'
import {
  scaleLinear, scaleOrdinal,
  scaleTime, schemeCategory20c,
} from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import React from 'react'

import XAxis from './XAxis'
import YAxis from './YAxis'

class TimeChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null }
    this.rememberValue = ::this.rememberValue
    this.forgetValue = ::this.forgetValue
  }

  rememberValue(e) {
    // get mouse x position, relative to container
    const node = e.target
    const rect = node.getBoundingClientRect()
    const xRel = e.clientX - rect.left - node.clientLeft

    this.setState({ hover: { x: xRel / rect.width } })
  }

  forgetValue() {
    this.setState({ hover: null })
  }

  render() {
    const { keys, data, margin, size } = this.props
    const { hover } = this.state

    const width = size.width - margin.left - margin.right
    const height = size.height - margin.top - margin.bottom

    const color = scaleOrdinal(schemeCategory20c);
    const parse = timeParse('%Y-%m-%d')

    // parse date, ensure all key cols are numbers
    const dataClean = data.map(d => (
      Object.assign({},
        { date: parse(d.date) },
        ...keys.map(id => ({ [id]: +d[id] })),
      )
    ))

    // nest data by key, standardize naming
    const dataByKey = keys.map(id => ({
      id: id.toLowerCase().replace(/\s/g, '_'),
      name: id,
      values: dataClean.map(d => ({ date: d.date, value: d[id] })),
    }))

    const x = scaleTime()
        .domain(extent(dataClean, d => d.date))
        .range([0, width])

    const y = scaleLinear()
        .domain([0, max(dataByKey, d => max(d.values, v => v.value))])
        .range([height, 0])

    const l = line()
        .x(d => x(d.date))
        .y(d => y(d.value))

    let callout
    if (hover) {
      const bisectDate = bisector(d => d.date).left
      const x0 = x.invert(hover.x * width)
      const i = bisectDate(dataClean, x0, 1)
      const [d0, d1] = [dataClean[i - 1], dataClean[i]]
      const dActive = x0 - d0.date > d1.date - x0 ? d1 : d0

      callout = (
        <g transform={`translate(${x(dActive.date)}, 0)`}>
          <line y2={height} stroke='#000' strokeWidth='1' />
          <text x='4' dy='.71em' className='h6 monospace'>
            {keys.map(k => `${k}: ${dActive[k]}`).join(', ')}
          </text>
        </g>
      )
    }

    return (
      <div>
        <svg
          preserveAspectRatio='xMidYMid'
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{ width: '100%', height: '100%' }}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XAxis scale={x} height={height} tickCt={4} />
            <YAxis scale={y} />
            {dataByKey.map((d, i) => (
              <g key={i} className={`series series-${d.id}`}>
                <path
                  d={l(d.values)}
                  fill='none'
                  stroke={color(d.id)}
                  strokeWidth='3'
                />
                {d.values.map((v, j) => (
                  <circle
                    key={j}
                    cx={x(v.date)}
                    cy={y(v.value)}
                    fill={color(d.id)}
                    r='6'
                    stroke='#fff'
                    strokeWidth='3'
                  />
                ))}
              </g>
            ))}
            {callout}
            <rect
              width={width}
              height={height}
              fill='none'
              pointerEvents='all'
              onMouseMove={this.rememberValue}
              onMouseOut={this.forgetValue}
            />
          </g>
        </svg>
      </div>
    )
  }
}

TimeChart.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

TimeChart.defaultProps = {
  margin: { top: 20, right: 30, bottom: 30, left: 30 },
  size: { width: 850, height: 300 },
}

export default TimeChart
