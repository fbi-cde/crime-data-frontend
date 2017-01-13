import { extent, histogram, max } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import React from 'react'

import HistogramDetails from './HistogramDetails'
import XAxis from './XAxis'

class Histogram extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null }
    this.rememberValue = ::this.rememberValue
    this.forgetValue = ::this.forgetValue
  }

  rememberValue(e) {
    const id = parseInt(e.target.getAttribute('data-id'), 10)
    this.setState({ hover: id })
  }

  forgetValue() {
    this.setState({ hover: null })
  }

  render() {
    const { data, margin, size } = this.props
    const { hover } = this.state

    const height = size.height - margin.top - margin.bottom
    const width = size.width - margin.left - margin.right
    const tickCt = 8

    const dataClean = data.map(d => ({ key: +d.key, value: +d.count }))

    const x = scaleLinear()
        .domain(extent(dataClean, d => d.key))
        .range([0, width])

    const hist = histogram()
        .domain(x.domain())
        .thresholds(10)
        .value(d => d.length)

    const bins = hist(dataClean)

    const y = scaleLinear()
        .domain([0, max(dataClean, d => d.value)])
        .range([height, 0])

    // default to last bin if no interaction
    const active = hover !== null ? hover : bins.length - 1

    return (
      <div>
        <svg
          preserveAspectRatio='xMidYMid'
          viewBox={`0 0 ${size.width} ${size.height}`}
          style={{ width: '100%', height: '100%' }}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {bins.map((d, i) => (
              <g
                key={i}
                transform={`translate(${x(d.x0)}, ${y(dataClean[i].value)})`}
              >
                <rect
                  x='1'
                  width={x(bins[0].x1) - x(bins[0].x0) - 1}
                  height={height - y(dataClean[i].value)}
                  fill={(hover === null || i === active) ? '#ff5e50' : '#f4dfdd'}
                  pointerEvents='all'
                  onMouseOver={this.rememberValue}
                  onMouseOut={this.forgetValue}
                />
              </g>
            ))}
            <XAxis scale={x} height={height} tickCt={tickCt} />
          </g>
        </svg>
        <HistogramDetails data={dataClean[active]} />
      </div>
    )
  }
}

Histogram.defaultProps = {
  margin: { top: 20, right: 20, bottom: 30, left: 20 },
  size: { width: 360, height: 160 },
}

export default Histogram
