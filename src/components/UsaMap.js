import React from 'react'
import startCase from 'lodash.startcase'

import Hint from './Hint'

import stateLookup from '../util/usa'
import svgData from '../../data/usa-state-svg.json'

class UsaMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null }
  }

  rememberValue = id => e => {
    this.setState({
      hover: { value: id, position: { x: e.pageX, y: e.pageY } },
    })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    const { mapClick, place } = this.props
    const { hover } = this.state

    const placeId = place && stateLookup(place).toUpperCase()
    const svgDataWithNames = svgData.map(s => ({
      ...s,
      name: startCase(stateLookup(s.id)),
    }))

    return (
      <div>
        <svg
          className='cursor-pointer usa-map'
          viewBox='0 0 959 593'
          preserveAspectRatio='xMidYMid'
        >
          <title>USA</title>
          <g onClick={mapClick}>
            {svgDataWithNames.map(s => (
              <path
                key={s.id}
                id={s.id}
                className={s.id === placeId ? 'fill-red-bright' : 'fill-blue-light'}
                d={s.d}
                pointerEvents='all'
                onMouseOver={this.rememberValue(s.name)}
                onMouseMove={this.rememberValue(s.name)}
                onMouseOut={this.forgetValue}
              />
            ))}
          </g>
        </svg>
        {hover ? <Hint {...hover} /> : null}
      </div>
    )
  }
}

export default UsaMap
