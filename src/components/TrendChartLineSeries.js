import { curveCardinal, line } from 'd3-shape'
import PropTypes from 'prop-types'
import startCase from 'lodash.startcase'
import React from 'react'

const TrendChartLineSeries = ({ color, series, showMarkers, x, y }) => {
  const l = line()
    .curve(curveCardinal.tension(0.5))
    .x(d => x(d.date))
    .y(d => y(d.rate))

  return (
    <g>
      {series.map((d, i) => {
        const ends = [d.values[0], d.values[d.values.length - 1]]

        return (
          <g key={i} className={`series series-${d.place}-${d.crime}`}>
            {d.segments.map((values, j) =>
              <g key={j}>
                <path
                  d={l(values)}
                  fill="none"
                  stroke={color(d.place)}
                  strokeWidth="2.5"
                  strokeDasharray={d.crime === 'rape-revised' && '5,4'}
                />
                {showMarkers &&
                  values.map((datum, k) =>
                    <circle
                      key={k}
                      cx={x(datum.date)}
                      cy={y(datum.rate)}
                      fill={color(d.place)}
                      r="2.5"
                    />,
                  )}
              </g>,
            )}
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
      {series
        .filter(s => s.crime !== 'rape-revised')
        .map(s => ({
          date: s.values[0].date,
          rate: s.values[0].rate,
          text: startCase(s.place),
        }))
        .sort((a, b) => b.rate - a.rate)
        .map((d, i) =>
          <text
            dy="0.35em"
            key={d.text}
            className="fs-10 bold xs-hide"
            textAnchor="end"
            transform={`translate(${x(d.date)}, ${y(d.rate)})`}
            x="-4"
            y={14 * (i === 0 ? -1 : 1)}
          >
            {d.text}
          </text>,
        )}
    </g>
  )
}

TrendChartLineSeries.propTypes = {
  color: PropTypes.func.isRequired,
  series: PropTypes.array.isRequired,
  showMarkers: PropTypes.bool.isRequired,
  x: PropTypes.func.isRequired,
  y: PropTypes.func.isRequired,
}

TrendChartLineSeries.defaultProps = {
  color: () => 'pink',
  showMarkers: false,
}

export default TrendChartLineSeries
