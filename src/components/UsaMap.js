import PropTypes from 'prop-types'
import React from 'react'

import Hint from './Hint'
import stateLookup from '../util/usa'
import svgData from '../../public/data/usa-state-svg.json'
import { lookupStateByAbbr, lookupStateByName, lookupRegionByCode, lookupStatesByRegion } from '../util/location'

class UsaMap extends React.Component {
  state = { hover: null }

  rememberValue = (name, id, stateView, states, region) => e => {
    if (stateView) {
      this.setState({
        hover: { value: name, position: { x: e.pageX, y: e.pageY }, id },
      })
      document.getElementById(id).style.fill = '#f48e88';
    } else {
      const value = lookupRegionByCode(region.regions, lookupStateByName(states.states, name).region_code).region_name
      this.setState({
        hover: { value, position: { x: e.pageX, y: e.pageY }, id },
      })
      const statesData = lookupStatesByRegion(states.states, lookupStateByName(states.states, name).region_code)
      for (const st in statesData) {
        if (document.getElementById(statesData[st].state_abbr)) document.getElementById(statesData[st].state_abbr).style.fill = '#f48e88';
      }
     }
  }

  forgetValue = (id, stateView, states) => e => {
    this.setState({ hover: null })
    if (stateView) {
      document.getElementById(id).style.fill = '';
    } else {
      const statesData = lookupStatesByRegion(states.states, lookupStateByAbbr(states.states, id).region_code)
      for (const st in statesData) {
        if (document.getElementById(statesData[st].state_abbr)) { document.getElementById(statesData[st].state_abbr).style.fill = ''; }
      }
    }
  }

  render() {
    const { colors, changeColorOnHover, mapClick, place, stateView, states, region } = this.props
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
          <g onClick={mapClick}>
            {
              svgDataWithNames.map(s => {
              let defaultClass = 'fill-blue-light'
                if (stateView === true) {
                  if (place.length > 0) {
                    for (var p in place) {
                      if (place[p]) {
                        if (s.id === place[p].state_abbr) {
                          defaultClass = 'fill-red-bright';
                        }
                      }
                    }
                  }
                } else {
                  const state = lookupStateByAbbr(states.states, s.id);
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
                  onMouseOver={this.rememberValue(s.name, s.id, stateView, states, region)}
                  onMouseMove={this.rememberValue(s.name, s.id, stateView, states, region)}
                  onMouseOut={this.forgetValue(s.id, stateView, states)}
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
  states: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,

}

export default UsaMap
