import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import React from 'react'

import NibrsHistogramDetails from './NibrsHistogramDetails'
import XAxis from './XAxis'

class NibrsHistogram extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null }
  }

  rememberValue = d => () => {
    this.setState({ hover: d })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    const { data, margin, noun, size, title, xLabel, yLabel } = this.props
    const { hover } = this.state

    const height = size.height - margin.top - margin.bottom
    const width = size.width - margin.left - margin.right

    const dataFiltered = data.filter(d => +d.key % 10 === 0)
    const bins = dataFiltered.map(d => ({
      x0: +d.key,
      x1: +d.key + 10,
      ct: +d.count,
    }))

    const binCt = bins.length
    const maxVal = max(bins, d => d.ct)
    const total = data.map(d => d.count).reduce((a, n) => a + n, 0)

    const x = scaleLinear()
        .domain([min(bins, d => d.x0), max(bins, d => d.x1)])
        .range([0, width])

    const y = scaleLinear()
        .domain([0, maxVal])
        .range([height, 0])

    return (
      <div className='mb2 pb2 border-bottom border-blue-light'>
        <div className='mb1 bold'>{title}</div>
        {yLabel && <div className='bold caps fs-14 red'>{yLabel}</div>}
        <div>
          <svg
            preserveAspectRatio='xMidYMid'
            viewBox={`0 0 ${size.width} ${size.height}`}
            style={{ width: '100%', height: '100%' }}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <g className='axis'>
                <line
                  x1='0'
                  y1='0'
                  x2='0'
                  y2={height}
                  strokeWidth='1'
                  strokeDasharray='3,3'
                />
              </g>
              {bins.map((d, i) => (
                <g
                  key={i}
                  className='cursor-pointer'
                  transform={`translate(${x(d.x0)}, ${y(d.ct)})`}
                >
                  <rect
                    width={x(bins[0].x1) - x(bins[0].x0) - 1}
                    height={height - y(d.ct)}
                    x='1'
                    fill={(hover === null || d.x0 === hover.x0) ? '#ff5e50' : '#f4dfdd'}
                    pointerEvents='all'
                    onMouseOver={this.rememberValue(d)}
                    onMouseOut={this.forgetValue}
                  />
                </g>
              ))}

              <XAxis scale={x} height={height} tickCt={binCt} />
            </g>
          </svg>
          {xLabel && <div className='bold caps center fs-14 red'>{xLabel}</div>}
          <NibrsHistogramDetails
            data={hover || { ct: total }}
            noun={noun}
          />
        </div>
      </div>
    )
  }
}

NibrsHistogram.defaultProps = {
  margin: { top: 5, right: 10, bottom: 20, left: 5 },
  size: { width: 360, height: 160 },
}

NibrsHistogram.propTypes = {
  noun: React.PropTypes.string.isRequired,
  xLabel: React.PropTypes.string,
  yLabel: React.PropTypes.string,
}

export default NibrsHistogram
