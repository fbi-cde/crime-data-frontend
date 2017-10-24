import PropTypes from 'prop-types'
import React from 'react'

import Hint from './Hint'
import stateLookup from '../util/usa'
import svgData from '../../public/data/usa-state-svg.json'
import {lookupStateByAbbr,lookupStateByName,lookupRegionByCode} from '../util/location'

class UsaMap extends React.Component {
  state = { hover: null }

  rememberValue = (id, stateView, stateData, regionData) => e => {
    if (stateView) {
      this.setState({
        hover: { value: id, position: { x: e.pageX, y: e.pageY } },
      })
    } else {
      console.log(lookupRegionByCode(regionData, lookupStateByName(stateData, id).region_code).region_name)
      this.setState({
        hover: { value: lookupRegionByCode(regionData,lookupStateByName(stateData, id).region_code).region_name, position: { x: e.pageX, y: e.pageY } },
      })
    }
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    const { colors, changeColorOnHover, mapClick, place, stateView, stateData, regionData } = this.props
    const { hover } = this.state
    const svgDataWithNames = svgData.map(s => ({
      ...s,
      name: stateLookup(s.id).display,
    }))
    return (
      <div>
        <svg
          className={`cursor-pointer usa-map ${!changeColorOnHover &&
            'no-hover'}`}
          viewBox="0 0 959 593"
          preserveAspectRatio="xMidYMid"
        >
          <title>USA</title>
          <g onClick={mapClick}>
            {
              svgDataWithNames.map(s => {
              let defaultClass = 'fill-blue-light'
                if (stateView === true) {
                  if (place.length > 0) {
                    for ( var p in place ) {
                      if (s.id === place[p].state_abbr) {
                        defaultClass = 'fill-red-bright';
                      }
                    }
                  }
                } else {
                  const state = lookupStateByAbbr(stateData, s.id);
                  if (state.region_code === 1) {
                    defaultClass = 'fill-blue-light1'
                  } else if (state.region_code === 2) {
                    defaultClass = 'fill-blue-light2'
                  } else if (state.region_code === 3) {
                    defaultClass = 'fill-blue-light3'
                  } else if (state.region_code === 4) {
                    defaultClass = 'fill-blue-light4'
                  }



                  if (place.length > 0) {
                    for (var p in place) {
                      if (s.id === place[p].state_abbr) {
                        defaultClass = 'fill-red-bright';
                      }
                  }
                }
              }

              return (
                <path
                  key={s.id}
                  id={s.id}
                  className={colors[s.id.toLowerCase()] || defaultClass}
                  d={s.d}
                  pointerEvents="all"
                  onMouseOver={this.rememberValue(s.name, stateView, stateData, regionData)}
                  onMouseMove={this.rememberValue(s.name, stateView, stateData, regionData)}
                  onMouseOut={this.forgetValue}
                />
              )
            })}
          </g>
        </svg>
        {hover ? <Hint {...hover} /> : null}
      </div>
    )
  }
}

UsaMap.defaultProps = {
  colors: {},
  changeColorOnHover: true,
}

UsaMap.propTypes = {
  colors: PropTypes.object.isRequired,
  changeColorOnHover: PropTypes.bool.isRequired,
  mapClick: PropTypes.func,
  place: PropTypes.array,
  stateView: PropTypes.bool.isRequired,
  stateData: PropTypes.array.isRequired,
  regionData: PropTypes.array.isRequired,

}

export default UsaMap
