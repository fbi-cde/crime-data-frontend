import axios from 'axios'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import React from 'react'
import { Motion, spring } from 'react-motion'
import { feature, mesh } from 'topojson'

const Container = ({ children }) => (
  <div className='aspect-ratio aspect-ratio--4x3'>{children}</div>
)

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
    const { selected } = this.props
    const { usa } = this.state

    if (!usa) return <Container />

    const [w, h] = [400, 300]
    const projection = geoAlbersUsa().scale(500).translate([w / 2, h / 2])
    const path = geoPath().projection(projection)
    const geoStates = feature(usa, usa.objects.units).features
    const meshed = mesh(usa, usa.objects.units, (a, b) => (a !== b))
    const active = geoStates.find(s => (s.properties.name === selected))

    let translate = [0, 0]
    let scale = 1
    let strokeWidth = 1

    if (active) {
      const bounds = path.bounds(active)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2

      scale = 0.8 / Math.max(dx / w, dy / h)
      translate = [(w / 2) - (scale * x), (h / 2) - (scale * y)]
      strokeWidth = 2.5 / scale
    }

    return (
      <Container>
        <svg
          className='aspect-ratio--object'
          preserveAspectRatio='xMidYMid'
          viewBox={`0 0 ${w} ${h}`}
        >
          <Motion
            style={{
              scale: spring(scale),
              strokeWidth: spring(strokeWidth),
              tX: spring(translate[0]),
              tY: spring(translate[1]),
            }}
          >
            {value => (
              <g
                strokeWidth={`${value.strokeWidth}px`}
                transform={`translate(${[value.tX, value.tY]})scale(${value.scale})`}
              >
                {geoStates.map((d, i) => (
                  <path
                    key={i}
                    d={path(d)}
                    fill={d.properties.name === selected ? '#95aabc' : '#eff4f9'}
                  />
                ))}
                <path
                  d={path(meshed)}
                  fill='none'
                  stroke='#fff'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            )}
          </Motion>
        </svg>
      </Container>
    )
  }
}

export default StateThumbnail
