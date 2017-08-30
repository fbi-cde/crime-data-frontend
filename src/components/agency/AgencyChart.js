import { max } from 'd3-array'
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import throttle from 'lodash.throttle'
import PropTypes from 'prop-types'
import React from 'react'

import AgencyChartDetails from './AgencyChartDetails'
import XAxis from '../XAxis'
import YAxis from '../YAxis'

class AgencyChart extends React.Component {
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

  rememberValue = d => () => {
    this.setState({ hover: d, yearSelected: null })
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  render() {
    const {
      colors,
      crime,
      data,
      mutedColors,
      since,
      size,
      submitsNibrs,
      until,
    } = this.props
    const { hover, svgParentWidth, yearSelected } = this.state

    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 3
    const { margin } = size
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const xPadding = svgWidth < 500 ? 20 : 40

    const keys = ['reported', 'cleared']
    const yMax = max([3, max(data, d => max(keys, k => d[k].count))])
    const colorMap = scaleOrdinal().domain(keys).range(colors)
    const mutedColorMap = scaleOrdinal().domain(keys).range(mutedColors)
    const noun = submitsNibrs ? 'incidents' : 'offenses'

    const y = scaleLinear().domain([0, yMax]).rangeRound([height, 0]).nice()

    // Use Range based upon Since and Unitl due to API returning bad data etc:  [  {...year:2005},{...year:2007},{...year:2008}]
    const timeRange = []
    for (let s = since; s < until + 1; s++) {
      timeRange.push(s)
    }
    const x0 = scaleBand()
      .domain(timeRange)
      .rangeRound([0 + xPadding, width - xPadding])
      .paddingInner(0.3)

    const x1 = scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0)

    const active = yearSelected
      ? data.find(d => d.year === yearSelected)
      : hover || data[data.length - 1]

    const activePriorYear = data.find(d => d.year === active.year - 1)

    // Find Missing Years from API Payload since it is not passing them back as NULL
    const missingDates = []
    if (data[0].year !== since) {
      missingDates.push(since)
    }
    if (data[data.length - 1].year !== until) {
      missingDates.push(until)
    }
    for (let i = 0; i < data.length - 1; i++) {
      const date1 = data[i].year

      const date2 = data[i + 1].year
      if (date1 + 1 !== date2) {
        const missingDate = date1 + 1
        missingDates.push(missingDate)
      }
    }

    const noDataYears = data
      .filter(d => d.reported === 0 && d.cleared === 0)
      .map(({ cleared, reported, year }) => ({
        cleared,
        reported,
        year,
      }))

    // Merge Missing Data Collections
    if (missingDates.length > 0) {
      for (let j = 0; j < missingDates.length; j++) {
        const noDataYearsObj = {}
        noDataYearsObj.cleared = 0
        noDataYearsObj.reported = 0
        noDataYearsObj.year = missingDates[j]
        noDataYears.push(noDataYearsObj)
      }
    }

    // no data (nd) element responsive values
    const [ndHeight, ndCircle, ndTextY, ndTextSize] =
      svgWidth < 500 ? [10, 5, 2.5, 8] : [20, 8, 4, 11]

    return (
      <div>
        <AgencyChartDetails
          colors={colorMap}
          crime={crime}
          f
          data={active}
          dataPrior={activePriorYear}
          keys={keys}
          noun={noun}
          since={since}
          updateYear={this.updateYear}
          until={until}
        />
        <div className="mb2 h6 bold monospace black">
          Total {noun} reported by year
        </div>
        <div className="mb3 col-12" ref={ref => (this.svgParent = ref)}>
          <svg
            className="bar-chart"
            width={svgWidth}
            height={svgHeight}
            style={{ maxWidth: '100%' }}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <XAxis scale={x0} height={height} />
              <YAxis scale={y} width={width} />
              <g transform="translate(0, -0.5)">
                {data.map(d =>
                  <g key={d.year} transform={`translate(${x0(d.year)}, 0)`}>
                    {keys.map(k =>
                      <rect
                        key={`${d.year}-${k}`}
                        x={x1(k)}
                        y={y(d[k].count)}
                        height={Math.max(0, height - y(d[k].count))}
                        width={x1.bandwidth()}
                        fill={
                          active.year === d.year
                            ? colorMap(k)
                            : mutedColorMap(k)
                        }
                        className="cursor-pointer"
                        pointerEvents="all"
                        onMouseOver={this.rememberValue(d)}
                      />,
                    )}
                  </g>,
                )}
                {noDataYears.map(d =>
                  <g
                    key={`ndy-${d.year}`}
                    transform={`translate(${x0(d.year) +
                      x1.bandwidth()}, ${height - ndHeight})`}
                    className="cursor-pointer no-year-data"
                    onMouseOver={this.rememberValue(d)}
                  >
                    <circle r={ndCircle} fill="transparent" strokeWidth="1px" />
                    <text
                      y={ndTextY}
                      textAnchor="middle"
                      style={{ fontSize: ndTextSize }}
                    >
                      ✕
                    </text>
                  </g>,
                )}
              </g>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

AgencyChart.propTypes = {
  colors: PropTypes.array.isRequired,
  crime: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  mutedColors: PropTypes.array.isRequired,
  since: PropTypes.number.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    margin: PropTypes.object,
  }).isRequired,
  submitsNibrs: PropTypes.bool.isRequired,
  until: PropTypes.number.isRequired,
}

AgencyChart.defaultProps = {
  colors: ['#702c27', '#ff5e50'],
  mutedColors: ['#f4e1df', '#faefee'],
  size: {
    width: 720,
    margin: { top: 16, right: 0, bottom: 24, left: 36 },
  },
}

export default AgencyChart
