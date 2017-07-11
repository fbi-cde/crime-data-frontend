import PropTypes from 'prop-types'
import React from 'react'

const TrendChartRapeAnnotate = ({ height, x }) =>
  <g transform={`translate(${x(new Date('2013-01-01'))}, ${height})`}>
    <line stroke="#95aabc" strokeWidth="1" y2={-height} />
    <rect
      className="fill-blue"
      height="8"
      transform="rotate(45 4 4)"
      width="8"
      x={-4 * Math.sqrt(2)}
    />
    <text
      className="fill-blue fs-10 italic serif"
      textAnchor="end"
      x="-12"
      y="-26"
    >
      Revised rape
    </text>
    <text
      className="fill-blue fs-10 italic serif"
      textAnchor="end"
      x="-12"
      y="-14"
    >
      definition
    </text>
  </g>

TrendChartRapeAnnotate.propTypes = {
  height: PropTypes.number.isRequired,
  x: PropTypes.func.isRequired,
}

export default TrendChartRapeAnnotate
