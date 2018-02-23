import { max } from 'd3-array'
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import throttle from 'lodash.throttle'
import uniqBy from 'lodash.uniqby'
import PropTypes from 'prop-types'
import React from 'react'

import AgencyChartDetails from './AgencyChartDetails'
import XAxis from '../XAxis'
import YAxis from '../YAxis'
import { rangeYears } from '../../util/years'

class AgencySummaryChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { svgParentWidth: null, yearSelected: null }
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

  getActive = data => {
    const { yearSelected } = this.state

    let active
    const selected = data.find(d => d.data_year === yearSelected)

    if (yearSelected && selected) {
      active = selected
      active.year = selected.data_year
    } else if (yearSelected && !selected) {
      // year selected but no data reported
      active = {
        year: yearSelected,
        actual: 0,
        cleared: 0,
      }
    } else {
      active = data[data.length - 1]
      active.year = active.data_year
    }

    const priorYear = data.find(d => d.data_year === active.year - 1)
    return {
      active,
      priorYear,
    }
  }

  getYMax = (data, keys = []) => {
    const min = 3
    const counts = data
      .map(d => keys.map(k => d[k]))
      .reduce((accum, next) => [...accum, ...next], [min])
    return max(counts)
  }

  getNoDataYears = (data = [], since, until) => {
    const missingYears = rangeYears(since, until).filter(
      year => !data.find(d => d.data_year === year),
    )
    const zeroReportedYears = data
      .filter(d => d.actual === 0 && d.cleared === 0)
      .map(d => d.data_year)
    const noDataYears = missingYears.concat(zeroReportedYears)

    return uniqBy(noDataYears).sort()
  }

  handleMouseOver = d => () => {
    this.updateYear(d)
  }

  updateYear = year => {
    this.setState({ yearSelected: year })
  }

  render() {
    const {
      colors,
      crime,
      mutedColors,
      since,
      size,
      submitsNibrs,
      until,
    } = this.props
    let data = this.props.data
    const { svgParentWidth } = this.state

    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 3
    const { margin } = size
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const negHeight = height * -1
    const negHeight2 = negHeight + 10

    const xPadding = svgWidth < 500 ? 20 : 40

    const keys = ['actual', 'cleared']
    const colorMap = scaleOrdinal().domain(keys).range(colors)
    const mutedColorMap = scaleOrdinal().domain(keys).range(mutedColors)
    const noun = submitsNibrs ? 'incidents' : 'offenses'
    const yMax = this.getYMax(data, keys)

    const y = scaleLinear().domain([0, yMax]).rangeRound([height, 0]).nice()

    const timeRange = rangeYears(since, until)
    const x0 = scaleBand()
      .domain(timeRange)
      .rangeRound([0 + xPadding, width - xPadding])
      .paddingInner(0.3)

    const yrRange = rangeYears(since, until)

    const x1 = scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0)

    const { active, priorYear: activePriorYear } = this.getActive(data)
    let lastRapeLegacyReported = 1995;
    if (crime === 'rape') {
      const dataSet = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].actual !== 0 && data[i].cleared !== 0) {
          if (data[i].offense === 'rape-legacy') {
            if (data[i].data_year > lastRapeLegacyReported) {
              lastRapeLegacyReported = data[i].data_year
            }
          }
          dataSet.push(data[i]);
        }
      }
      data = dataSet
    }
    lastRapeLegacyReported += 1;

    const noDataYears = this.getNoDataYears(data, since, until)


    // no data (nd) element responsive values
    const [ndHeight, ndCircle, ndTextY, ndTextSize] =
      svgWidth < 500 ? [10, 5, 2.5, 8] : [20, 8, 4, 11]

    return (
      <div>
        <AgencyChartDetails
          colors={colorMap}
          crime={crime}
          data={active}
          dataPrior={activePriorYear}
          keys={keys}
          noun={noun}
          updateYear={this.updateYear}
          yrRange={yrRange}
          until={until}
          since={since}
          nibrsDetails={false}
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
              {until > 2013 &&
                crime === 'rape' &&
                <g transform={`translate(${x0(lastRapeLegacyReported)}, ${height})`}>
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
                    y={negHeight}
                  >
                    Revised rape
                  </text>
                  <text
                    className="fill-blue fs-10 italic serif"
                    textAnchor="end"
                    x="-12"
                    y={negHeight2}
                  >
                    definition
                  </text>
                </g>
              }
              <g transform="translate(0, -0.5)">
                {data.map(d =>
                  <g key={d.year} transform={`translate(${x0(d.data_year)}, 0)`}>
                    {keys.map(k =>
                      <rect
                        key={`${d.data_year}-${k}`}
                        x={x1(k) + 5}
                        y={y(d[k])}
                        height={Math.max(0, height - y(d[k]))}
                        width={x1.bandwidth() - 5}
                        fill={
                          this.state.yearSelected === d.data_year
                            ? colorMap(k)
                            : mutedColorMap(k)
                        }
                        className="cursor-pointer"
                        pointerEvents="all"
                        onMouseOver={this.handleMouseOver(d.data_year)}
                      />,
                    )}
                  </g>,

                )}
                {noDataYears.map(year =>
                  <g
                    key={`ndy-${year}`}
                    transform={`translate(${x0(year) +
                      x1.bandwidth()}, ${height - ndHeight})`}
                    className="cursor-pointer no-year-data"
                    onMouseOver={this.handleMouseOver(year)}
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

AgencySummaryChart.propTypes = {
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

AgencySummaryChart.defaultProps = {
  colors: ['#702c27', '#ff5e50'],
  mutedColors: ['#f4e1df', '#faefee'],
  size: {
    width: 720,
    margin: { top: 16, right: 0, bottom: 24, left: 36 },
  },
}

export default AgencySummaryChart
