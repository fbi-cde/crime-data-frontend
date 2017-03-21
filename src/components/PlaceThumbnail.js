import axios from 'axios'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import React from 'react'
import { feature, mesh } from 'topojson'

import MapCities from './MapCities'
import MapCounties from './MapCounties'


const Container = ({ children }) => (
  <div className='my4 center'>
    <div className='aspect-ratio aspect-ratio--4x3'>{children}</div>
  </div>
)

class StateThumbnail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { usa: null }
  }

  componentDidMount() {
    axios.get('/data/geo-usa.json')
      .then(response => { this.setState({ usa: response.data }) })
  }

  render() {
    const { selected } = this.props
    const { usa } = this.state

    if (!usa) return <Container />

    const [w, h] = [400, 300]
    const projection = geoAlbersUsa().scale(500).translate([w / 2, h / 2])
    const path = geoPath().projection(projection)
    const meshed = mesh(usa, usa.objects.states, (a, b) => (a !== b))

    const geoStates = feature(usa, usa.objects.states).features
    const geoCounties = feature(usa, usa.objects.counties).features
    const geoCities = feature(usa, usa.objects.places).features

    const active = geoStates.find(s => (s.properties.name === selected))
    const countiesActive = geoCounties.filter(c => c.properties.state === selected)
    const citiesActive = geoCities.filter(c => c.properties.state === selected)

    let strokeWidth
    let transform
    if (active) {
      const bounds = path.bounds(active)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const scale = 0.8 / Math.max(dx / w, dy / h)
      const translate = [(w / 2) - (scale * x), (h / 2) - (scale * y)]

      strokeWidth = active ? (3 / scale) : 1
      transform = `translate(${translate})scale(${scale})`
    }

    return (
      <Container>
        <svg
          className='aspect-ratio--object'
          preserveAspectRatio='xMidYMid'
          viewBox={`0 0 ${w} ${h}`}
        >
          <g
            strokeWidth={`${strokeWidth}px`}
            transform={transform}
          >
            {geoStates.map((d, i) => (
              <path
                key={i}
                d={path(d)}
                fill={d.properties.name === selected || !active ? '#95aabc' : '#eff4f9'}
              />
            ))}
            <path
              d={path(meshed)}
              fill='none'
              stroke='#fff'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <MapCounties
              counties={countiesActive}
              path={path}
              strokeWidth={strokeWidth}
            />
            <MapCities
              cities={citiesActive}
              projection={projection}
              strokeWidth={strokeWidth}
            />
          </g>
        </svg>
      </Container>
    )
  }
}

export default StateThumbnail
