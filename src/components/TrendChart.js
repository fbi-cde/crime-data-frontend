/* eslint-disable react/jsx-no-bind */

import { bisector, extent, max, min } from 'd3-array'
import { scaleLinear, scaleOrdinal, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import startCase from 'lodash.startcase'
import throttle from 'lodash.throttle'
import { timeParse } from 'd3-time-format'
import React from 'react'

import DownloadDataBtn from './DownloadDataBtn'
import TrendChartDetails from './TrendChartDetails'
import XAxis from './XAxis'
import YAxis from './YAxis'

import { slugify } from '../util/text'

class TrendChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null, svgParentWidth: null }
    this.getDimensions = throttle(::this.getDimensions, 20)
    this.forgetValue = ::this.forgetValue
    this.rememberValue = ::this.rememberValue
  }

  componentDidMount() {
    this.getDimensions()
    window.addEventListener('resize', this.getDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getDimensions)
  }

  getDimensions() {
    if (this.svgParent) {
      this.setState({ svgParentWidth: this.svgParent.clientWidth })
    }
  }

  forgetValue() {
    this.setState({ hover: null })
  }

  rememberValue(e) {
    // get mouse x position, relative to container
    const node = e.target
    const rect = node.getBoundingClientRect()
    const xRel = e.clientX - rect.left - node.clientLeft

    this.setState({ hover: { x: xRel / rect.width } })
  }

  render() {
    const {
      keys,
      crime,
      colors,
      data,
      dispatch,
      margin,
      place,
      since,
      size,
      until,
    } = this.props
    const { hover, svgParentWidth } = this.state

    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 2.25
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom

    const xTicks = svgWidth < 500 ? 4 : 8
    const color = scaleOrdinal(colors);
    const parse = timeParse('%Y')

    const keysWithSlugs = keys.map(name => ({ name, slug: slugify(name) }))

    const dataClean = data.map(d => (
      Object.assign(
        { year: +d.date, date: parse(d.date) },
        ...keysWithSlugs.map(k => ({ [k.slug]: d[k.slug] })),
      )
    ))

    const gaps = []
    const dataByKey = keysWithSlugs.map(k => {
      const segments = [[]]
      const values = dataClean.map(d => ({
        year: d.year,
        date: d.date,
        value: d[k.slug],
      }))

      values.forEach(d => {
        if (d.value.count !== 0) {
          segments[segments.length - 1].push(d)
        } else {
          gaps.push(d.year)
          segments.push([])
        }
      })

      return { id: k.slug, name: k.name, values, segments }
    })

    const gapRanges = gaps.map(year => ([
      max([year - 1, since]),
      year,
      min([year + 1, until]),
    ].map(y => parse(y))))

    const x = scaleTime()
        .domain(extent(dataClean, d => d.date))
        .range([0, width])

    const y = scaleLinear()
        .domain([0, max(dataByKey, d => max(d.values, v => v.value.rate))])
        .range([height, 0])
        .nice()

    const l = line()
        .x(d => x(d.date))
        .y(d => y(d.value.rate))

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
        <line y2={height} stroke='#95aabc' strokeWidth='1' />
        {keysWithSlugs.map((k, j) => (
          <circle
            key={j}
            cx='0'
            cy={y(active[k.slug].rate)}
            fill={color(k.slug)}
            r={active[k.slug].count ? '4' : '0'}
          />
        ))}
      </g>
    )

    return (
      <div className='px2 py3 sm-p4 bg-white'>
        <TrendChartDetails
          colors={colors}
          crime={crime}
          data={active}
          dispatch={dispatch}
          keys={keysWithSlugs}
        />
        {/* eslint-disable no-return-assign */}
        <div
          className='col-12'
          ref={ref => this.svgParent = ref}
        >
          {gapRanges.length > 0 && (
            <div className='pl5 fs-12 serif italic'>
              <span
                className='mr1 inline-block align-middle bg-blue-white blue-light border rounded'
                style={{ width: 14, height: 14 }}
              />
              Insufficent state data reported
            </div>
          )}
          <svg
            width={svgWidth}
            height={svgHeight}
            style={{ maxWidth: '100%' }}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              {gapRanges.map((d, i) => (
                <rect
                  className='fill-blue-white'
                  key={i}
                  x={x(d[0])}
                  width={x(d[2]) - x(d[0])}
                  height={height}
                />
              ))}
              <XAxis scale={x} height={height} tickCt={xTicks} />
              <YAxis scale={y} width={width} />
              {dataByKey.map((d, i) => (
                <g key={i} className={`series series-${d.id}`}>
                  {d.segments.map((s, j) => (
                    <path
                      key={j}
                      d={l(s)}
                      fill='none'
                      stroke={color(d.id)}
                      strokeWidth='2'
                    />
                  ))}
                </g>
              ))}
              {(until >= 2013 && crime === 'rape') && (
                <g transform={`translate(${x(new Date('2013-01-01'))}, ${height})`}>
                  <line
                    stroke='#95aabc'
                    strokeWidth='1'
                    strokeDasharray='2,3'
                    y2={-height}
                  />
                  <rect
                    className='fill-blue'
                    height='8'
                    transform='rotate(45 4 4)'
                    width='8'
                    x={-4 * Math.sqrt(2)}
                  />
                  <text
                    className='fill-blue fs-10 italic serif'
                    textAnchor='end'
                    x='-4'
                    y='-22'
                  >
                    Revised rape
                  </text>
                  <text
                    className='fill-blue fs-10 italic serif'
                    textAnchor='end'
                    x='-4'
                    y='-10'
                  >
                    definition
                  </text>
                </g>
              )}
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
        <div className='my2 fs-10 sm-fs-12 line-height-1 bold monospace center'>
          {startCase(crime)} rate per 100,000 people (does not include estimates)
        </div>
        <DownloadDataBtn
          data={data}
          fname={`${place}-${crime}-${since}–${until}`}
          text='Download data'
        />
      </div>
    )
  }
}

TrendChart.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  since: React.PropTypes.number.isRequired,
  until: React.PropTypes.number.isRequired,
}

TrendChart.defaultProps = {
  margin: { top: 20, right: 20, bottom: 30, left: 40 },
  size: { width: 735 },
  colors: ['#ff5e50', '#52687d', '#97a7b8'],
}

export default TrendChart
