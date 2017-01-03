/* eslint-disable react/jsx-no-bind */

import { extent, max } from 'd3-array'
import {
  scaleLinear, scaleOrdinal,
  scaleTime, schemeCategory20c,
} from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import React from 'react'

import Hint from './Hint'
import XAxis from './XAxis'
import YAxis from './YAxis'

class TimeChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: null }
    this.rememberValue = ::this.rememberValue
    this.forgetValue = ::this.forgetValue
  }

  rememberValue(d, e) {
    this.setState({
      active: { data: d, position: { x: e.pageX, y: e.pageY } },
    })
  }

  forgetValue() {
    this.setState({ active: null })
  }

  render() {
    const { keys, data, margin, size } = this.props
    const { active } = this.state

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

    return (
      <div>
        <svg width={size.width} height={size.height}>
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
                    onMouseOver={e => this.rememberValue(v, e)}
                    onMouseMove={e => this.rememberValue(v, e)}
                    onMouseOut={this.forgetValue}
                  />
                ))}
              </g>
            ))}
          </g>
        </svg>
        {active ? <Hint {...active} /> : null}
      </div>
    )
  }
}

TimeChart.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
}

TimeChart.defaultProps = {
  margin: { top: 20, right: 20, bottom: 30, left: 50 },
  size: { width: 600, height: 400 },
}

export default TimeChart
