import axios from 'axios'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import PropTypes from 'prop-types'
import React from 'react'
import { feature, mesh } from 'topojson'
import { connect } from 'react-redux'
import { lookupStatesByRegion, lookupRegionByName } from '../util/location'
import { slugify } from '../util/text'

const Container = ({ children }) =>
  <div className="center bg-white rounded">
    <div className="aspect-ratio aspect-ratio--4x3">
      {children}
    </div>
  </div>

class PlaceThumbnail extends React.Component {
  state = { usa: null }

  componentDidMount() {
    axios.get('/data/geo-usa-states.json').then(response => {
      this.setState({ usa: response.data })
    })
  }

  render() {
    const { coordinates, place, placeType, region, states, placeName } = this.props
    const { usa } = this.state

    if (!usa) return <Container />

    const [w, h] = [400, 300]
    const projection = geoAlbersUsa().scale(500).translate([w / 2, h / 2])
    const path = geoPath().projection(projection)
    console.log('Path:', path, usa)
    const geoStates = feature(usa, usa.objects.units).features
    console.log('GeoState:', geoStates)
    const meshed = mesh(usa, usa.objects.units, (a, b) => a !== b)
    let actives = []

    if(placeType == 'region'){
      let regionStates = lookupStatesByRegion(states.states,lookupRegionByName(region.regions,place).region_code)
      for(let sr in regionStates){

        actives.push(geoStates.find(
          s => s.properties.name === regionStates[sr].state_name,
        ))
      }
    }else if (place !== 'washington-dc') {
      actives.push(geoStates.find(
        s => s.properties.name === placeName,
      ))
    } else {
      actives.push(geoStates.find(s => s.id === 'US11'))
    }
    const { lat, lng } = coordinates || {}
    const pin = coordinates && projection([lng, lat])

    let scale = 1
    let translate = [0, 0]
    let strokeWidth = 1
    if (actives && placeType !== 'region') {
      const bounds = path.bounds(actives[0])
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      scale = 0.8 / Math.max(dx / w, dy / h)
      // Increases Scale if Smaller State
      if (scale > 25) {
        scale = 0.2 / Math.max(dx / w, dy / h)
      }
      translate = [w / 2 - scale * x, h / 2 - scale * y]
      strokeWidth = 2.5 / scale
    }

    window.gs = geoStates

    let geoHtml =[]
    for(let geo in geoStates){
      let activeColor = '#dfe6ed'
      for(let active in actives){
        if(geoStates[geo].properties.name == actives[active].properties.name){
          activeColor = '#94aabd'
        }
      }
      geoHtml.push( <path  key={geoStates[geo].id} d={path(geoStates[geo])} fill={activeColor} />)
    }
    console.log("GeoHtml:",geoHtml)
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
              {geoHtml}
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
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  placeName: PropTypes.string.isRequired,
  states: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
}

const mapStateToProps = ({ filters, region, states }) => {
  const { place, placeType } = filters

  return {
    place,
    placeType,
    region,
    states,
  }
}

export default connect(mapStateToProps)(PlaceThumbnail)
