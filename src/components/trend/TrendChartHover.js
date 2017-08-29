import PropTypes from 'prop-types'
import React from 'react'

const TrendChartHover = ({ active, color, height, x, y }) => {
  const data = active.filter(
    a => a.crime !== 'rape-revised' && a.rate && a.count,
  )
  return (
    <g transform={`translate(${x(data[0].date)}, 0)`} id="trend-chart-callout">
      <line
        y2={height}
        stroke="#95aabc"
        strokeDasharray="2,3"
        strokeWidth="1"
      />
      {data.map((a, i) =>
        <circle key={i} cx="0" cy={y(a.rate)} fill={color(a.place)} r="4.5" />,
      )}
    </g>
  )
}
TrendChartHover.propTypes = {
  active: PropTypes.array.isRequired,
  color: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
}

export default TrendChartHover
