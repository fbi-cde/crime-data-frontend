/* eslint-disable react/jsx-no-bind */

import { bisector, extent, max, min } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import { curveCardinal, line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import throttle from 'lodash.throttle'
import PropTypes from 'prop-types'
import React from 'react'

import TrendChartDetails from './TrendChartDetails'
import TrendChartHover from './TrendChartHover'
import TrendChartLineSeries from './TrendChartLineSeries'
import XAxis from './XAxis'
import YAxis from './YAxis'

class TrendChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null, svgParentWidth: null, yearSelected: null }
    this.getDimensions = throttle(this.getDimensions, 20)
  }

  componentDidMount() {
    this.getDimensions()
    window.addEventListener('resize', this.getDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions)
  }

  getDimensions = () => {
    if (this.svgParent) {
      this.setState({ svgParentWidth: this.svgParent.clientWidth })
    }
  }

  createSeries = ({ crimes, data, places }) => {
    const [dates, rates] = [[], []]
    const series = places
      .map(p =>
        crimes.map(c => {
          const gaps = []
          const segments = [[]]
          const values = data.filter(d => d[p][c] && d[p][c].count).map(d => ({
            date: d.date,
            year: d.year,
            population: d[p].population,
            ...d[p][c],
          }))

          values.forEach(d => {
            if (d.count && d.count !== 0) {
              segments[segments.length - 1].push(d)
            } else {
              gaps.push(d.year)
              segments.push([])
            }
            dates.push(d.date)
            rates.push(d.rate)
          })

          return {
            crime: c,
            gaps,
            place: p,
            segments,
            values,
          }
        }),
      )
      .reduce((a, n) => a.concat(n), [])

    return { dates, rates, series }
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  rememberValue = e => {
    // get mouse x position, relative to container
    const node = e.target
    const rect = node.getBoundingClientRect()
    const xRel = e.clientX - rect.left - node.clientLeft

    this.setState({ hover: { x: xRel / rect.width }, yearSelected: null })
  }

  render() {
    const {
      crime,
      colors,
      data,
      dispatch,
      showMarkers,
      since,
      size,
      until,
    } = this.props
    const { hover, svgParentWidth, yearSelected } = this.state
    const { margin } = size
    const color = scaleOrdinal(colors)
    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 2.25
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const xPadding = svgWidth < 500 ? 30 : 80
    const parse = timeParse('%Y')
    const places = Object.keys(data[0]).filter(
      k => k !== 'year' && k !== 'date',
    )

    const isRape = crime === 'rape'
    const crimes = [isRape ? 'rape-legacy' : crime]
    if (isRape) crimes.push('rape-revised')

    const dataByYear = data.map(d => ({ ...d, date: parse(d.year) }))
    const { dates, rates, series } = this.createSeries({
      crimes,
      data: dataByYear,
      places,
    })

    const x = scaleTime().domain(extent(dates)).range([xPadding, width - 30])
    const y = scaleLinear().domain([0, max(rates)]).range([height, 0]).nice()

    const l = line()
      .curve(curveCardinal.tension(0.25))
      .x(d => x(d.date))
      .y(d => y(d.rate))

    let active = series.map(d => ({
      crime: d.crime,
      place: d.place,
      ...(yearSelected
        ? d.values.find(v => v.year === yearSelected)
        : d.values[d.values.length - 1]),
    }))

    if (!yearSelected && hover) {
      const bisectDate = bisector(d => d.date).left
      const x0 = x.invert(hover.x * width)
      active = series.map(({ crime: c, place: p, values }) => {
        const i = bisectDate(values, x0, 1)
        const [d0, d1] = [values[i - 1], values[i]]

        return {
          crime: c,
          place: p,
          ...(d0 && d1 && x0 - d0.date > d1.date - x0 ? d1 : d0),
        }
      })
    }

    return (
      <div>
        <TrendChartDetails
          colors={colors}
          crime={crime}
          data={active}
          dispatch={dispatch}
          keys={places}
          since={since}
          updateYear={this.updateYear}
          until={until}
        />
        <div className="mb3 fs-10 bold monospace black">
          Rate per 100,000 people, by year
        </div>
        {/* eslint-disable no-return-assign */}
        <div className="mb3 col-12" ref={ref => (this.svgParent = ref)}>
          <svg width={svgWidth} height={svgHeight} style={{ maxWidth: '100%' }}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <XAxis
                active={active[0].date}
                scale={x}
                height={height}
                tickCt={svgWidth < 500 ? 4 : 8}
              />
              <YAxis scale={y} width={width} />
              <TrendChartLineSeries
                color={color}
                line={l}
                series={series}
                showMarkers={showMarkers}
                x={x}
                y={y}
              />
              {until >= 2013 &&
                crime === 'rape' &&
                <g
                  transform={`translate(${x(
                    new Date('2013-01-01'),
                  )}, ${height})`}
                >
                  <line stroke="#95aabc" strokeWidth="1" y2={-height} />
                  <rect
                    className="fill-blue"
                    height="8"
                    transform="rotate(45 4 4)"
                    width="8"
                    x={-4 * Math.sqrt(2)}
                  />
                  <text
                    className="fill-blue fs-10 italic serif"
                    textAnchor="end"
                    x="-12"
                    y="-26"
                  >
                    Revised rape
                  </text>
                  <text
                    className="fill-blue fs-10 italic serif"
                    textAnchor="end"
                    x="-12"
                    y="-14"
                  >
                    definition
                  </text>
                </g>}
              <TrendChartHover
                color={color}
                data={places
                  .map(p =>
                    active.filter(a => a.place === p && a.rate && a.count),
                  )
                  .reduce((a, n) => a.concat(n), [])}
                height={height}
                x={x}
                y={y}
              />
              <rect
                width={width}
                height={height}
                fill="none"
                pointerEvents="all"
                onMouseMove={this.rememberValue}
              />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

TrendChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

TrendChart.defaultProps = {
  size: {
    width: 735,
    margin: { top: 16, right: 0, bottom: 24, left: 32 },
  },
  colors: ['#ff5e50', '#95aabc', '#52687d'],
  showMarkers: false,
}

export default TrendChart
