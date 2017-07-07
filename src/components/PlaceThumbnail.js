import axios from 'axios'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import PropTypes from 'prop-types'
import React from 'react'
import { feature, mesh } from 'topojson'

const Container = ({ children }) =>
  <div className="center bg-white rounded">
    <div className="aspect-ratio aspect-ratio--4x3">{children}</div>
  </div>

class PlaceThumbnail extends React.Component {
  state = { usa: null }

  componentDidMount() {
    axios.get('/data/geo-usa-states.json').then(response => {
      this.setState({ usa: response.data })
    })
  }

  render() {
    const { coordinates, usState } = this.props
    const { usa } = this.state

    if (!usa) return <Container />

    const [w, h] = [400, 300]
    const projection = geoAlbersUsa().scale(500).translate([w / 2, h / 2])
    const path = geoPath().projection(projection)
    const geoStates = feature(usa, usa.objects.units).features
    const meshed = mesh(usa, usa.objects.units, (a, b) => a !== b)

    const placeUpper = usState.toUpperCase()
    const active = geoStates.find(
      s => s.properties.name.toUpperCase() === placeUpper,
    )

    const { lat, lng } = coordinates
    const pin = coordinates && projection([lng, lat])

    let scale = 1
    let translate = [0, 0]
    let strokeWidth = 1

    if (active) {
      const bounds = path.bounds(active)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2

      scale = 0.8 / Math.max(dx / w, dy / h)
      translate = [w / 2 - scale * x, h / 2 - scale * y]
      strokeWidth = 2.5 / scale
    }

    return (
      <Container>
        <svg
          className="aspect-ratio--object"
          preserveAspectRatio="xMidYMid"
          viewBox={`0 0 ${w} ${h}`}
        >
          <g
            strokeWidth={strokeWidth}
            transform={`translate(${translate})scale(${scale})`}
          >
            <g>
              {geoStates.map((d, i) =>
                <path
                  key={i}
                  d={path(d)}
                  fill={
                    d.properties.name.toUpperCase() === placeUpper || !active
                      ? '#94aabd'
                      : '#dfe6ed'
                  }
                />,
              )}
              <path
                d={path(meshed)}
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            {pin &&
              <circle
                cx={pin[0]}
                cy={pin[1]}
                r={8 / scale}
                className="fill-red-bright"
              />}
          </g>
        </svg>
      </Container>
    )
  }
}

PlaceThumbnail.defaultProps = {
  coordinates: false,
}

PlaceThumbnail.propTypes = {
  coordinates: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  usState: PropTypes.string.isRequired,
}

export default PlaceThumbnail
