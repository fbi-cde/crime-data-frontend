import { descending } from 'd3-array'
import { scaleOrdinal } from 'd3-scale'
import { arc, pie } from 'd3-shape'
import React from 'react'

import NibrsDonutDetails from './NibrsDonutDetails'

class NibrsDonut extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hover: null }
  }

  rememberValue = d => () => {
    this.setState({ hover: d })
  }

  forgetValue = () => {
    this.setState({ hover: null })
  }

  render() {
    const { colors, data, size, title } = this.props
    const { hover } = this.state

    const { height, width } = size
    const r = Math.min(width, height) / 2

    const dataSorted = [...data]
    dataSorted.sort((a, b) => +b.count - +a.count)

    const keys = data.map(d => d.key)
    keys.sort()

    const pieGen = pie().sort(descending).value(d => d.count)
    const arcGen = arc().innerRadius(r / 3).outerRadius(r - 20)

    const dataDisplay = pieGen(dataSorted)

    const colorMap = scaleOrdinal()
      .domain(keys)
      .range(colors)

    return (
      <div className='mb2 pb2 border-bottom border-blue-light'>
        <div className='mb-tiny blue bold'>{title}</div>
        <div className='clearfix mxn1'>
          <div className='col col-6 px1'>
            <svg
              className='cursor-pointer'
              preserveAspectRatio='xMidYMid'
              viewBox={`0 0 ${size.width} ${size.height}`}
              style={{ width: '100%', height: '100%' }}
            >
              <g transform={`translate(${width / 2}, ${height / 2})`}>
                {dataDisplay.map((d, i) => {
                  const key = d.data.key
                  return (
                    <path
                      key={i}
                      d={arcGen(d)}
                      fill={colorMap(key)}
                      fillOpacity={hover === null || hover === key ? 1 : 0.5}
                      pointerEvents='all'
                      onMouseOver={this.rememberValue(key)}
                      onMouseOut={this.forgetValue}
                    />
                  )
                })}
              </g>
            </svg>
          </div>
          <div className='col col-6 px1'>
            <NibrsDonutDetails
              colorMap={colorMap}
              data={dataSorted}
              hover={hover}
              onMouseOver={this.rememberValue}
              onMouseOut={this.forgetValue}
              selected={hover}
            />
          </div>
        </div>
      </div>
    )
  }
}

NibrsDonut.defaultProps = {
  size: { width: 175, height: 175 },
  colors: ['#52687d', '#ff5e50', '#97a7b8'],
}

export default NibrsDonut
