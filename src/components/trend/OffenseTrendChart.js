import { bisector, extent, max } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import throttle from 'lodash.throttle'
import React from 'react'
import PropTypes from 'prop-types'
import { timeParse } from 'd3-time-format'

import OffenseTrendChartDetails from './OffenseTrendChartDetails'
import TrendChartRapeLegend from './TrendChartRapeLegend'
import TrendChartLineSeries from './TrendChartLineSeries'
import TrendChartRapeAnnotate from './TrendChartRapeAnnotate'
import XAxis from '../XAxis'
import YAxis from '../YAxis'

class OffenseTrendChart extends React.Component {
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

  createOffenseTrendSeries = (trendData, places, since, until) => {
    const parse = timeParse('%Y')
    const gridObj = {}
    // Create dates
    const dates = []

    // This is terrible
    let i = since
    while (i < until + 1) {
      dates.push(parse(i))
      i++
    }
    i = since
    while (i < until + 1) {
      dates.push(parse(i))
      i++
    }
    gridObj.dates = dates

    // Create Series and Rates
    const series = []
    const rates = []

    const gaps = []
    for (let j = 0; j < places.length; j++) {
      const seriesObj = {}
      seriesObj.crime = trendData.offense
      const place = places[j]
      const placeTrendData = trendData[place]
      const values = []
      // Segements
      const segments = []
      for (let k = 0; k < placeTrendData.length; k++) {
        const value = placeTrendData[k]
        value.date = parse(value.year)
        values.push(value)
        segments.push(value)
        rates.push(value.rate)
      }
      seriesObj.values = values
      seriesObj.segments = []
      seriesObj.segments.push(segments)
      seriesObj.place = place
      seriesObj.gaps = gaps
      series.push(seriesObj)
    }
    gridObj.rates = rates
    gridObj.series = series

    return gridObj
  }

  fetchTrendDataByYear = (series, yearSelected) => {
    const active = []
    for (let j = 0; j < series.series.length > 0; j++) {
      for (let k = 0; k < series.series[j].values.length; k++) {
        if (series.series[j].values[k].year === yearSelected) {
          const activeObj = series.series[j].values[k]
          activeObj.place = series.series[j].place
          activeObj.crime = series.series[j].crime
          active.push(activeObj)
        }
      }
    }
    return active
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  render() {
    const { trendData, since, until, size, colors } = this.props
    const { hover, svgParentWidth, yearSelected } = this.state
    const { margin } = size
    const color = scaleOrdinal(colors)
    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 2.25
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const xPad = svgWidth < 500 ? 15 : 30
    const parse = timeParse('%Y')
    const crime = trendData.offense
    const places = []

    const keys = Object.keys(trendData)
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'offense') {
        places.push(keys[i])
      }
    }

    const newSeries = this.createOffenseTrendSeries(
      trendData,
      places,
      since,
      until,
    )
    let active
    if (yearSelected === null) {
      active = this.fetchTrendDataByYear(newSeries, until)
    } else {
      active = this.fetchTrendDataByYear(newSeries, yearSelected)
    }
    const { dates, rates, series } = newSeries

    const x = scaleTime().domain(extent(dates)).range([xPad, width - xPad])
    const y = scaleLinear().domain([0, max(rates)]).range([height, 0]).nice()
    console.log('OffenseTrendChart Series:', series)

    return (
      <div>
        {' '}<OffenseTrendChartDetails
          active={active}
          colors={colors}
          crime={crime}
          keys={places}
          since={since}
          updateYear={this.updateYear}
          until={until}
        />
        <div className="mb2 clearfix">
          <div className="sm-col mb1 sm-m0 fs-10 bold monospace black">
            Rate per 100,000 people, by year
          </div>
          {crime === 'rape' && <TrendChartRapeLegend />}
        </div>
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
              <rect
                width={width}
                height={height}
                fill="none"
                pointerEvents="all"
              />
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

OffenseTrendChart.propTypes = {
  trendData: PropTypes.object,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

OffenseTrendChart.defaultProps = {
  size: {
    width: 400,
    margin: { top: 16, right: 0, bottom: 24, left: 32 },
  },
  colors: ['#ff5e50', '#95aabc', '#52687d'],
}

export default OffenseTrendChart
