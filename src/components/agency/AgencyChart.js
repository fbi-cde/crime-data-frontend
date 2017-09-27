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

class AgencyChart extends React.Component {
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
    const selected = data.find(d => d.year === yearSelected)

    if (yearSelected && selected) {
      active = selected
    } else if (yearSelected && !selected) {
      // year selected but no data reported
      active = {
        year: yearSelected,
        reported: { count: 0 },
        cleared: { count: 0 },
      }
    } else {
      active = data[data.length - 1]
    }

    const priorYear = data.find(d => d.year === active.year - 1)

    return {
      active,
      priorYear,
    }
  }

  getYMax = (data, keys = []) => {
    const min = 3
    const counts = data
      .map(d => keys.map(k => d[k].count))
      .reduce((accum, next) => [...accum, ...next], [min])
    return max(counts)
  }

  getNoDataYears = (data = [], since, until) => {
    const missingYears = rangeYears(since, until).filter(
      year => !data.find(d => d.year === year),
    )
    const zeroReportedYears = data
      .filter(d => d.reported === 0 && d.cleared === 0)
      .map(d => d.year)
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
      data,
      mutedColors,
      since,
      size,
      submitsNibrs,
      until,
    } = this.props
    const { svgParentWidth } = this.state

    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 3
    const { margin } = size
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
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

    const x1 = scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0)

    const { active, priorYear: activePriorYear } = this.getActive(data)
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
                          this.state.yearSelected === d.year
                            ? colorMap(k)
                            : mutedColorMap(k)
                        }
                        className="cursor-pointer"
                        pointerEvents="all"
                        onMouseOver={this.handleMouseOver(d.year)}
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
