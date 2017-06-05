import axios from 'axios'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import React from 'react'
import { feature, mesh } from 'topojson'

const Container = ({ children }) => (
  <div className="center bg-white rounded">
    <div className="aspect-ratio aspect-ratio--4x3">{children}</div>
  </div>
)

class PlaceThumbnail extends React.Component {
  state = { usa: null }

  componentDidMount() {
    axios.get('/data/geo-usa-states.json').then(response => {
      this.setState({ usa: response.data })
    })
  }

  render() {
    const { selected, isAgency } = this.props
    const { usa } = this.state

    if (!usa) return <Container />

    const [w, h] = [400, 300]
    const projection = geoAlbersUsa().scale(500).translate([w / 2, h / 2])
    const path = geoPath().projection(projection)
    const geoStates = feature(usa, usa.objects.units).features
    const meshed = mesh(usa, usa.objects.units, (a, b) => a !== b)
    const active = geoStates.find(s => s.properties.name === selected)

    let strokeWidth
    let transform
    if (active) {
      const bounds = path.bounds(active)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const scale = 0.8 / Math.max(dx / w, dy / h)
      const translate = [w / 2 - scale * x, h / 2 - scale * y]

      strokeWidth = active ? `${2.5 / scale}px` : 1
      transform = `translate(${translate})scale(${scale})`
    }

    return (
      <Container>
        <svg
          className="aspect-ratio--object"
          preserveAspectRatio="xMidYMid"
          viewBox={`0 0 ${w} ${h}`}
        >
          <g strokeWidth={strokeWidth} transform={transform}>
            {geoStates.map((d, i) => (
              <path
                key={i}
                d={path(d)}
                fill={
                  d.properties.name === selected || !active
                    ? '#94aabd'
                    : '#dfe6ed'
                }
              />
            ))}
            <path
              d={path(meshed)}
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          {isAgency &&
            <g transform={`translate(${w / 2}, ${h / 2})`}>
              <circle r="7" fill="#ff5e50" />
              <polygon
                points="0 0, -7 -14, 7 -14"
                fill="#ff5e50"
                transform="translate(0, 15)"
              />
            </g>}
        </svg>
      </Container>
    )
  }
}

export default PlaceThumbnail
