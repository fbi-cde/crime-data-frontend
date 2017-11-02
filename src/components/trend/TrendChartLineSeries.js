import { curveCardinal, line } from 'd3-shape'
import PropTypes from 'prop-types'
import React from 'react'

const TrendChartLineSeries = ({ color, series, x, y }) => {
  const l = line()
    .curve(curveCardinal.tension(0.25))
    .x(d => x(d.date))
    .y(d => y(d.rate))

  return (
    <g>
      {series.map((d, i) => {
        const ends = [d.values[0], d.values[d.values.length - 1]]
        return (
          <g key={i} className={`series series-${d.place}-${d.crime}`}>
            <path
              d={l(d.values)}
              fill="none"
              stroke={color(d.place)}
              strokeWidth="2.5"
              strokeDasharray={d.crime === 'rape-revised' && '5,4'}
            />
            {d.crime !== 'rape-revised' &&
              ends.map((pt, j) =>
                <circle
                  key={j}
                  cx={x(pt.date)}
                  cy={y(pt.rate)}
                  fill={color(d.place)}
                  r="3.5"
                />,
              )}
          </g>
        )
      })}
    </g>
  )
}

TrendChartLineSeries.propTypes = {
  color: PropTypes.func,
  series: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
}

TrendChartLineSeries.defaultProps = {
  color: () => 'tomato',
}

export default TrendChartLineSeries
