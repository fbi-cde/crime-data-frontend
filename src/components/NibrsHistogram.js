import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import React from 'react'

import NibrsHistogramDetails from './NibrsHistogramDetails'
import XAxis from './XAxis'

class NibrsHistogram extends React.Component {
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
    const { data, margin, size, title } = this.props
    const { hover } = this.state

    const height = size.height - margin.top - margin.bottom
    const width = size.width - margin.left - margin.right

    const bins = data.map(d => ({
      x0: +d.key,
      x1: +d.key + 10,
      ct: +d.count,
    }))
    const binCt = bins.length

    const x = scaleLinear()
        .domain([min(bins, d => d.x0), max(bins, d => d.x1)])
        .range([0, width])

    const y = scaleLinear()
        .domain([0, max(bins, d => d.ct)])
        .range([height, 0])

    // default to first bin if no interaction
    const active = hover !== null ? hover : 0

    return (
      <div className='mb2 pb2 border-bottom'>
        <div className='mb1 bold'>{title}</div>
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
                  className='cursor-pointer'
                  transform={`translate(${x(d.x0)}, ${y(d.ct)})`}
                >
                  <rect
                    data-id={i}
                    x='1'
                    width={x(bins[0].x1) - x(bins[0].x0) - 1}
                    height={height - y(d.ct)}
                    fill={(hover === null || i === active) ? '#ff5e50' : '#f4dfdd'}
                    pointerEvents='all'
                    onMouseOver={this.rememberValue}
                    onMouseOut={this.forgetValue}
                  />
                </g>
              ))}
              <XAxis scale={x} height={height} tickCt={binCt} />
            </g>
          </svg>
          {bins[active] && <NibrsHistogramDetails data={bins[active]} />}
        </div>
      </div>
    )
  }
}

NibrsHistogram.defaultProps = {
  margin: { top: 20, right: 20, bottom: 30, left: 20 },
  size: { width: 360, height: 160 },
}

export default NibrsHistogram
