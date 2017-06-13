import { extent, max, min } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { curveCardinal, line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import throttle from 'lodash.throttle'
import PropTypes from 'prop-types'
import React from 'react'

const parse = timeParse('%Y')

class Sparkline extends React.Component {
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

  render() {
    const { data, size, yMax } = this.props
    const { svgParentWidth } = this.state
    const { margin } = size
    const width = svgParentWidth || size.width
    const height = width / 3

    const clean = data.map(d => Object.assign({ date: parse(d.year), ...d }))
    const last = clean[clean.length - 1]

    const x = scaleTime()
      .domain(extent(clean, d => d.date))
      .range([0, width - margin * 2])

    const domain = [min(clean, d => d.rate), yMax || max(clean, d => d.rate)]
    const y = scaleLinear()
      .domain(domain)
      .range([height - margin * 2, 0])
      .nice()

    const l = line().curve(curveCardinal).x(d => x(d.date)).y(d => y(d.rate))

    return (
      <div ref={ref => (this.svgParent = ref)}>
        <svg width={width} height={height} style={{ maxWidth: '100%' }}>
          <g transform={`translate(${margin}, ${margin})`}>
            <path d={l(clean)} fill="none" stroke="#ff5e50" strokeWidth="3" />
            <circle cx={x(last.date)} cy={y(last.rate)} fill="#ff5e50" r="4" />
          </g>
        </svg>
      </div>
    )
  }
}

Sparkline.defaultProps = {
  size: {
    width: 162,
    margin: 8,
  },
}

Sparkline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  yMax: PropTypes.number,
}

export default Sparkline
