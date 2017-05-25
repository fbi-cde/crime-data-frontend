import { max } from 'd3-array'
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import throttle from 'lodash.throttle'
import React from 'react'

import AgencyChartDetails from './AgencyChartDetails'
import XAxis from './XAxis'
import YAxis from './YAxis'

class AgencyChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null, svgParentWidth: null }
    this.getDimensions = throttle(::this.getDimensions, 20)
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

  rememberValue = d => () => {
    this.setState({ hover: d })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    const { colors, crime, data, size } = this.props
    const { hover, svgParentWidth } = this.state

    const svgWidth = svgParentWidth || size.width
    const svgHeight = svgWidth / 3
    const { margin } = size
    const width = svgWidth - margin.left - margin.right
    const height = svgHeight - margin.top - margin.bottom
    const xPadding = svgWidth < 500 ? 20 : 40

    const keys = ['reported', 'cleared']
    const yMax = max(data, d => max(keys, k => d[k]))

    const colorMap = scaleOrdinal().domain(keys).range(colors)
    const y = scaleLinear().domain([0, yMax]).rangeRound([height, 0]).nice()

    const x0 = scaleBand()
      .domain(data.map(d => d.year))
      .rangeRound([0 + xPadding, width - xPadding])
      .paddingInner(0.3)
    const x1 = scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0)

    const active = hover || data[data.length - 1]

    return (
      <div>
        <AgencyChartDetails
          colors={colorMap}
          crime={crime}
          data={active}
          keys={keys}
        />
        <div className="mb2 h6 bold monospace black">
          Total incidents reported by year
        </div>
        <div className="mb3 col-12" ref={ref => (this.svgParent = ref)}>
          <svg width={svgWidth} height={svgHeight} style={{ maxWidth: '100%' }}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <XAxis scale={x0} height={height} />
              <YAxis scale={y} width={width} />
              {data.map(d => (
                <g key={d.year} transform={`translate(${x0(d.year)}, 0)`}>
                  {keys.map(k => (
                    <rect
                      key={`${d.year}-${k}`}
                      x={x1(k)}
                      y={y(d[k])}
                      height={Math.max(0, height - y(d[k]))}
                      width={x1.bandwidth()}
                      fill={colorMap(k)}
                      fillOpacity={
                        !hover || hover.year === d.year ? '1' : '.75'
                      }
                      className="cursor-pointer"
                      pointerEvents="all"
                      onMouseOver={this.rememberValue(d)}
                      onMouseOut={this.forgetValue}
                    />
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

AgencyChart.defaultProps = {
  colors: ['#6F2925', '#FD5F55'],
  size: {
    width: 720,
    margin: { top: 16, right: 0, bottom: 24, left: 36 },
  },
}

export default AgencyChart
