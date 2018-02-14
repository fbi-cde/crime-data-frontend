import { entries } from 'd3-collection'
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import { stack, stackOrderReverse } from 'd3-shape'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

import CountPercentToggle from './CountPercentToggle'
import StackedBarDetails from './StackedBarChartDetails'
import { formatNum } from '../../util/formats'

class StackedBarChart extends React.Component {
  state = { isCounts: false }

  render() {
    const {
      colors,
      margin,
      size,
      data,
      year,
    } = this.props
    const fitleredDataByYear = data.data.filter(d => d.data_year === year)

    const { isCounts } = this.state
    const height = size.height - margin.top - margin.bottom
    const width = size.width - margin.left - margin.right
    const totalCt = fitleredDataByYear.reduce((a, b) => a + +b.value, 0)
    const x = scaleBand().domain([null]).rangeRound([0, width]).padding(0.4)
    const y = scaleLinear().domain([0, totalCt]).rangeRound([height, 0]).nice()

    const colorMap = scaleOrdinal()
      .domain(data.keys || data.keys.map(d => d.key).sort())
      .range(colors)

    const lookup = Object.assign(fitleredDataByYear.map(d => ({ [d.key]: +d.value })))


      const dataClean = {}
      for (const d in fitleredDataByYear) {
        for (const m in data.keys) {
          if (fitleredDataByYear[d].key === data.keys[m]) { dataClean[data.keys[m]] = fitleredDataByYear[d].value; }
        }
      }


    const stackGen = stack()
      .keys(Object.keys(dataClean))
      .order(stackOrderReverse)
    const dataStacked = stackGen([dataClean])
    const dataEntries = entries(dataClean)


    return (
      <div className="p2 sm-p3 bg-white black">
        <div className="clearfix">
          <div className="left">
            <div className="mb2 blue bold">
              {data.title}
            </div>
          </div>
          <div className="right">
            <CountPercentToggle
              ariaControls={data.noun}
              isCounts={isCounts}
              showCounts={() => {
                this.setState({ isCounts: true })
              }}
              showPercents={() => {
                this.setState({ isCounts: false })
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end mxn1 mb2">
          <div className="col px1" style={{ width: '55%' }}>
            <svg
              className="block"
              preserveAspectRatio="xMidYMid"
              viewBox={`0 0 ${size.width} ${size.height}`}
              style={{ width: '100%', height: '100%' }}
            >
              <g transform={`translate(${margin.left}, ${margin.top})`}>
                {dataStacked.map(d =>
                  <g key={d.key} fill={colorMap(d.key)}>
                    <rect
                      x={x(null)}
                      y={y(d[0][1])}
                      height={y(d[0][0]) - y(d[0][1])}
                      width={x.bandwidth()}
                    />
                  </g>,
                )}
                <g className="axis" transform={`translate(0, ${height})`}>
                  <line x2={width} strokeWidth="1" />
                </g>
              </g>
            </svg>
          </div>

          <div className="col px1" id={data.noun} style={{ width: '45%' }}>
            <StackedBarDetails
              colorMap={colorMap}
              data={dataEntries}
              isCounts={isCounts}
              total={totalCt}
            />
          </div>
        </div>
        <div className="mt-tiny fs-14 mb3">
          {data.short_title} was reported for{' '}
          <span className="bold red">{formatNum(totalCt)}</span>{' '}
          {pluralize(data.noun, totalCt)}.
        </div>
      </div>
    )
  }
}

StackedBarChart.defaultProps = {
  margin: { top: 5, right: 10, bottom: 0, left: 10 },
  size: { width: 200, height: 130 },
  colors: ['#FF5E50', '#B84941', '#F48E88'],
}

StackedBarChart.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
}

export default StackedBarChart
