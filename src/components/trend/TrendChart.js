/* eslint-disable react/jsx-no-bind */

import { bisectLeft, extent, max } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import range from 'lodash.range'
import throttle from 'lodash.throttle'
import PropTypes from 'prop-types'
import React from 'react'

import TrendChartDetails from './TrendChartDetails'
import TrendChartHover from './TrendChartHover'
import TrendChartLineSeries from './TrendChartLineSeries'
import TrendChartRapeAnnotate from './TrendChartRapeAnnotate'
import TrendChartRapeLegend from './TrendChartRapeLegend'
import XAxis from '../XAxis'
import YAxis from '../YAxis'
import { formatYear } from '../../util/formats'

class TrendChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      svgParentWidth: null,
      yearSelected: props.initialYearSelected,
    }
    this.getDimensions = throttle(this.getDimensions, 20)
  }

  componentDidMount() {
    this.getDimensions()
    window.addEventListener('resize', this.getDimensions)
  }

  componentWillReceiveProps(nextProps) {
    const { initialYearSelected } = this.props
    const { initialYearSelected: next } = nextProps
    if (next === initialYearSelected) return
    this.setState({ yearSelected: next })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions)
  }

  getDimensions = () => {
    if (this.svgParent) {
      this.setState({ svgParentWidth: this.svgParent.clientWidth })
    }
  }

  getYearFromXPosition = xPosition => {
    const { since, until } = this.props
    const { width, xPad } = this.calculateDimensions()
    const dates = range(since, until).map(d => formatYear(d))
    const x = scaleTime().domain(extent(dates)).range([xPad, width - xPad])

    const x0 = x.invert(xPosition * width)
    const i = bisectLeft(dates, x0, 1)
    const [d0, d1] = [dates[i - 1], dates[i]]
    const pt = d0 && d1 && x0 - d0 > d1 - x0 ? d1 : d0

    return pt.getFullYear()
  }

  createSeries = () => {
    const { crime, data, places } = this.props
    const isRape = crime === 'rape'
    const crimes = [isRape ? 'rape-legacy' : crime]
    if (isRape) crimes.push('rape-revised')

    const dataByYear = data.map(d => ({ ...d, date: formatYear(d.year) }))
    return places
      .map(place =>
        crimes.map(c => {
          const values = dataByYear
            .filter(d => d[place][c] && d[place][c].count)
            .map(d => ({
              date: d.date,
              year: d.year,
              population: d[place].population,
              ...d[place][c],
            }))

          return { crime: c, place, values }
        }),
      )
      .reduce((a, n) => a.concat(n), [])
  }

  calculateDimensions = () => {
    const { margin, width: initialWidth } = this.props.size
    const { svgParentWidth } = this.state

    const svgWidth = svgParentWidth || initialWidth
    const svgHeight = svgWidth / 2.25
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const xPad = svgWidth < 500 ? 15 : 30

    return { width, height, xPad, svgHeight, svgWidth }
  }

  handleMouseMove = e => {
    // get mouse x position, relative to container
    const node = e.target
    const rect = node.getBoundingClientRect()
    const xRel = e.clientX - rect.left - node.clientLeft
    const yearSelected = this.getYearFromXPosition(xRel / rect.width)

    this.props.onChangeYear(yearSelected)
  }

  render() {
    const {
      crime,
      colors,
      places,
      onChangeYear: handleChangeYear,
      since,
      size,
      until,
    } = this.props
    const { yearSelected } = this.state
    const { margin } = size

    const color = scaleOrdinal(colors)
    const {
      height,
      width,
      xPad,
      svgHeight,
      svgWidth,
    } = this.calculateDimensions()

    const series = this.createSeries()
    const dates = range(since, until).map(d => formatYear(d))
    const rates = series
      .map(s => s.values)
      .reduce((accum, next) => accum.concat(next), [])
      .map(s => s.rate)

    const x = scaleTime().domain(extent(dates)).range([xPad, width - xPad])
    const y = scaleLinear().domain([0, max(rates)]).range([height, 0]).nice()

    const active = series.map(s => {
      const { values } = s
      const activeValue = yearSelected
        ? values.find(v => v.year === yearSelected)
        : values[values.length - 1]

      return {
        crime: s.crime,
        place: s.place,
        ...activeValue,
      }
    })

    return (
      <div>
        <TrendChartDetails
          active={active}
          colors={colors}
          crime={crime}
          keys={places}
          since={since}
          onChangeYear={handleChangeYear}
          until={until}
        />
        <div className="mb2 clearfix">
          <div className="sm-col mb1 sm-m0 fs-12 bold monospace black">
            Rate per 100,000 people, by year
          </div>
          {crime === 'rape' && <TrendChartRapeLegend />}
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
              <TrendChartLineSeries color={color} series={series} x={x} y={y} />
              {until > 2013 &&
                crime === 'rape' &&
                <TrendChartRapeAnnotate height={height} x={x} />}
              <TrendChartHover
                active={active}
                color={color}
                height={height}
                x={x}
                y={y}
              />
              <rect
                width={width}
                height={height}
                fill="none"
                pointerEvents="all"
                onMouseMove={this.handleMouseMove}
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
  onChangeYear: PropTypes.func,
  initialYearSelected: PropTypes.number,
}

TrendChart.defaultProps = {
  size: {
    width: 735,
    margin: { top: 16, right: 0, bottom: 24, left: 32 },
  },
  colors: ['#ff5e50', '#95aabc', '#52687d'],
  onChangeYear: () => {},
}

export default TrendChart
