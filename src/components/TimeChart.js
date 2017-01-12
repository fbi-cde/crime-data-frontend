/* eslint-disable react/jsx-no-bind */

import { bisector, extent, max } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import React from 'react'

import { slugify } from '../util/text'
import TimeChartDetails from './TimeChartDetails'
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
    const { keys, colors, data, margin, size } = this.props
    const { hover } = this.state

    const width = size.width - margin.left - margin.right
    const height = size.height - margin.top - margin.bottom

    const color = scaleOrdinal(colors);
    const parse = timeParse('%Y')

    const keysWithSlugs = keys.map(name => ({ name, slug: slugify(name) }))

    // parse date, ensure all key cols are numbers
    const dataClean = data.map(d => (
      Object.assign(
        { date: parse(d.date) },
        ...keysWithSlugs.map(k => ({ [k.slug]: +d[k.slug] })),
      )
    ))

    // nest data by key, standardize naming
    const dataByKey = keysWithSlugs.map(k => {
      const values = dataClean.map(d => ({
        date: d.date,
        value: d[k.slug],
      }))
      return { id: k.slug, name: k.name, values }
    })

    const x = scaleTime()
        .domain(extent(dataClean, d => d.date))
        .range([0, width])

    const y = scaleLinear()
        .domain([0, max(dataByKey, d => max(d.values, v => v.value))])
        .range([height, 0])

    const l = line()
        .x(d => x(d.date))
        .y(d => y(d.value))

    let active = dataClean[dataClean.length - 1]
    if (hover) {
      const bisectDate = bisector(d => d.date).left
      const x0 = x.invert(hover.x * width)
      const i = bisectDate(dataClean, x0, 1)
      const [d0, d1] = [dataClean[i - 1], dataClean[i]]

      if (d0 && d1) {
        active = (x0 - d0.date > d1.date - x0) ? d1 : d0
      }
    }

    const callout = (
      <g transform={`translate(${x(active.date)}, 0)`}>
        <line y2={height} stroke='#000' strokeWidth='1' strokeDasharray='2,2' />
        {keysWithSlugs.map((k, j) => (
          <circle
            key={j}
            cx='0'
            cy={y(active[k.slug])}
            fill={color(k.slug)}
            r='6'
            stroke='#fff'
            strokeWidth='2'
          />
        ))}
      </g>
    )

    return (
      <div>
        <TimeChartDetails colors={colors} data={active} keys={keysWithSlugs} />
        <svg
          preserveAspectRatio='xMidYMid'
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{ width: '100%', height: '100%' }}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XAxis scale={x} height={height} tickCt={4} />
            <YAxis scale={y} width={width} />
            {dataByKey.map((d, i) => (
              <g key={i} className={`series series-${d.id}`}>
                <path
                  d={l(d.values)}
                  fill='none'
                  stroke={color(d.id)}
                  strokeWidth='3'
                />
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
  colors: ['#52687d', '#ff5e50', '#97a7b8'],
}

export default TimeChart
