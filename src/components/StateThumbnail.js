import axios from 'axios'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import find from 'lodash.find'
import React from 'react'
import { feature, mesh } from 'topojson'

class StateThumbnail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { usa: null }
  }

  componentDidMount() {
    axios.get('data/geo-usa-states.json')
      .then(response => { this.setState({ usa: response.data }) })
  }

  render() {
    const { usa } = this.state
    if (!usa) return null

    const { size, place } = this.props
    const { w, h } = size

    const projection = geoAlbersUsa().scale(1000).translate([w / 2, h / 2])
    const path = geoPath().projection(projection)
    const geoStates = feature(usa, usa.objects.units).features
    const meshed = mesh(usa, usa.objects.units, (a, b) => (a !== b))

    const active = find(geoStates, s => (s.properties.name === place))
    const bounds = path.bounds(active)
    const dx = bounds[1][0] - bounds[0][0]
    const dy = bounds[1][1] - bounds[0][1]
    const x = (bounds[0][0] + bounds[1][0]) / 2
    const y = (bounds[0][1] + bounds[1][1]) / 2
    const scale = 0.85 / Math.max(dx / w, dy / h)
    const translate = [(w / 2) - (scale * x), (h / 2) - (scale * y)]

    return (
      <svg
        preserveAspectRatio='xMidYMid'
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: '250px', height: 'auto' }}
      >
        <g
          strokeWidth={`${1.5 / scale}px`}
          transform={`translate(${translate})scale(${scale})`}
        >
          {geoStates.map((d, i) => (
            <path
              key={i}
              d={path(d)}
              fill={d.properties.name === place ? 'orange' : '#ccc'}
            />
          ))}
          <path
            d={path(meshed)}
            fill='none'
            stroke='#fff'
            strokeWidth={0.5}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
      </svg>
    )
  }
}

StateThumbnail.defaultProps = {
  size: { w: 960, h: 500 },
}

export default StateThumbnail
