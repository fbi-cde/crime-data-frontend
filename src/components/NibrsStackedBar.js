import { entries } from 'd3-collection'
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import { stack, stackOrderReverse } from 'd3-shape'
import PropTypes from 'prop-types'
import React from 'react'

import NibrsStackedBarDetails from './NibrsStackedBarDetails'

class NibrsStackedBar extends React.Component {
  state = { hover: null }

  rememberValue = d => () => {
    this.setState({ hover: d })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    const { colors, keys, data, margin, size, title } = this.props
    const { hover } = this.state

    const height = size.height - margin.top - margin.bottom
    const width = size.width - margin.left - margin.right

    const totalCt = data.reduce((a, b) => a + +b.count, 0)

    const x = scaleBand().domain([null]).rangeRound([0, width]).padding(0.4)

    const y = scaleLinear().domain([0, totalCt]).rangeRound([height, 0]).nice()

    const colorMap = scaleOrdinal()
      .domain(keys || data.map(d => d.key).sort())
      .range(colors)

    const lookup = Object.assign(...data.map(d => ({ [d.key]: +d.count })))
    const dataClean = keys
      ? Object.assign(...keys.map(k => ({ [k]: lookup[k] || 0 })))
      : { ...lookup }

    const stackGen = stack()
      .keys(Object.keys(dataClean))
      .order(stackOrderReverse)

    const dataStacked = stackGen([dataClean])
    const dataEntries = entries(dataClean)

    return (
      <div className="mb2 pb2 border-bottom border-blue-light">
        <div className="mb2 blue bold">{title}</div>
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
                  <g
                    key={d.key}
                    className="cursor-pointer"
                    fill={colorMap(d.key)}
                    pointerEvents="all"
                    onMouseOver={this.rememberValue(d.key)}
                    onMouseOut={this.forgetValue}
                  >
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

          <div className="col px1" style={{ width: '45%' }}>
            <NibrsStackedBarDetails
              colorMap={colorMap}
              data={dataEntries}
              onMouseOver={this.rememberValue}
              onMouseOut={this.forgetValue}
              selected={hover}
              total={totalCt}
            />
          </div>

        </div>
      </div>
    )
  }
}

NibrsStackedBar.defaultProps = {
  margin: { top: 5, right: 10, bottom: 0, left: 10 },
  size: { width: 200, height: 130 },
  colors: ['#FF5E50', '#B84941', '#F48E88'],
}

NibrsStackedBar.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

export default NibrsStackedBar
