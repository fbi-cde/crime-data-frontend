import PropTypes from 'prop-types'
import React from 'react'

const TrendChartHover = ({ color, data, height, x, y }) =>
  <g transform={`translate(${x(data[0].date)}, 0)`} id="trend-chart-callout">
    <line y2={height} stroke="#95aabc" strokeDasharray="2,3" strokeWidth="1" />
    {data.map((a, i) =>
      <circle key={i} cx="0" cy={y(a.rate)} fill={color(a.place)} r="4.5" />,
    )}
  </g>

TrendChartHover.propTypes = {
  color: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
}

export default TrendChartHover
