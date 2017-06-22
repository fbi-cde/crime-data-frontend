/* eslint-disable react/jsx-no-bind */

import { bisector, extent, max, min } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import { curveCardinal, line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import startCase from 'lodash.startcase'
import throttle from 'lodash.throttle'
import PropTypes from 'prop-types'
import React from 'react'

import TrendChartDetails from './TrendChartDetails'
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

    const dataByYear = data.map(d => ({ ...d, date: parse(d.year) }))
    const isRape = crime === 'rape'
    const crimes = [isRape ? 'rape-legacy' : crime]
    if (isRape) crimes.push('rape-revised')

    const series = places
      .map(p =>
        crimes.map(c => {
          const gaps = []
          const segments = [[]]
          const values = dataByYear
            .filter(d => d[p][c] && d[p][c].count)
            .map(d => ({
              date: d.date,
              year: d.year,
              population: d[p].population,
              ...d[p][c],
            }))
          const ends = [values[0], values[values.length - 1]]

          values.forEach(d => {
            if (d.count && d.count !== 0) {
              segments[segments.length - 1].push(d)
            } else {
              gaps.push(d.year)
              segments.push([])
            }
          })

          return {
            crime: c,
            ends,
            gaps,
            label: {
              date: values[0].date,
              rate: values[0].rate,
              text: startCase(p),
            },
            place: p,
            segments,
            values,
          }
        }),
      )
      .reduce((a, n) => a.concat(n), [])

    const [dates, rates] = [[], []]

    series.forEach(s => {
      const { values } = s

      values.forEach(v => {
        dates.push(v.date)
        rates.push(v.rate)
      })
    })

    const x = scaleTime().domain(extent(dates)).range([xPadding, width - 30])
    const y = scaleLinear().domain([0, max(rates)]).range([height, 0]).nice()

    const l = line()
      .curve(curveCardinal.tension(0.25))
      .x(d => x(d.date))
      .y(d => y(d.rate))

    let active

    if (!yearSelected && hover) {
      const bisectDate = bisector(d => d.date).left
      const x0 = x.invert(hover.x * width)

      const hoverActive = series
        .map(({ place, values }) => {
          const i = bisectDate(values, x0, 1)
          const [d0, d1] = [values[i - 1], values[i]]
          let out

          if (!d0) {
            out = d1
          } else if (d0 && !d1) {
            out = d0
          } else if (d0 && d1) {
            out = x0 - d0.date > d1.date - x0 ? d1 : d0
          }

          if (out.year !== x0.getFullYear()) return false

          return {
            ...out,
            place,
          }
        })
        .filter(s => s)

      if (hoverActive.length > 0) active = hoverActive
    } else {
      active = series.map(s => {
        const match = s.values.find(d => d.year === (yearSelected || 2007))
        return { ...match, place: s.place }
      })
    }

    const callout = (
      <g
        transform={`translate(${x(active[0].date)}, 0)`}
        id="trend-chart-callout"
      >
        <line
          y2={height}
          stroke="#95aabc"
          strokeDasharray="2,3"
          strokeWidth="1"
        />
        {places.map((p, j) =>
          active
            .filter(a => a.place === p && a.rate && a.count)
            .map((a, jj) =>
              <circle
                key={`${j}${jj}`}
                cx="0"
                cy={y(a.rate)}
                fill={color(p)}
                r="4.5"
              />,
            ),
        )}
      </g>
    )

    return (
      <div>

        <div className="mb3 fs-10 bold monospace black">
          Rate per 100,000 people, by year
        </div>
        {/* eslint-disable no-return-assign */}
        <div className="mb3 col-12" ref={ref => (this.svgParent = ref)}>
          <svg width={svgWidth} height={svgHeight} style={{ maxWidth: '100%' }}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <XAxis
                active={active}
                scale={x}
                height={height}
                tickCt={svgWidth < 500 ? 4 : 8}
              />
              <YAxis scale={y} width={width} />
              {series.map((d, i) =>
                <g key={i} className={`series series-${d.place}-${d.crime}`}>
                  {d.segments.map((values, j) =>
                    <g key={j}>
                      <path
                        d={l(values)}
                        fill="none"
                        stroke={color(d.place)}
                        strokeWidth="2.5"
                        strokeDasharray={d.crime === 'rape-revised' && '10,10'}
                      />
                      {showMarkers &&
                        values.map((datum, k) =>
                          <circle
                            key={k}
                            cx={x(datum.date)}
                            cy={y(datum.rate)}
                            fill={color(d.place)}
                            r="2.5"
                          />,
                        )}
                    </g>,
                  )}
                  {d.ends.map((datum, j) =>
                    <circle
                      key={j}
                      cx={x(datum.date)}
                      cy={y(datum.rate)}
                      fill={color(d.place)}
                      r="3.5"
                    />,
                  )}
                </g>,
              )}
              {series
                .filter(s => s.crime !== 'rape-revised')
                .map(s => s.label)
                .sort((a, b) => b.rate - a.rate)
                .map((d, i) =>
                  <text
                    dy="0.35em"
                    key={d.text}
                    className="fs-10 bold xs-hide"
                    textAnchor="end"
                    transform={`translate(${x(d.date)}, ${y(d.rate)})`}
                    x="-4"
                    y={14 * (i === 0 ? -1 : 1)}
                  >
                    {d.text}
                  </text>,
                )}
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
              {callout}
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
