import { format } from 'd3-format'
import PropTypes from 'prop-types'
import React from 'react'

const fmt = p => (p > 0.01 ? format('.0%')(p) : '<1%')

const NibrsStackedBarDetails = ({ colorMap, data, total }) => (
  <ul className="list-style-none p0 m0 fs-14">
    {data.map((d, i) => {
      const notLast = i + 1 !== data.length ? 'mb1' : ''
      return (
        <li
          key={d.key}
          className={`${notLast} flex items-baseline border-bottom-dashed`}
        >
          <span
            className="mr1"
            style={{ width: 10, height: 10, backgroundColor: colorMap(d.key) }}
          />
          <div className="flex flex-auto justify-between">
            <span>{d.key}</span>
            <span className="monospace">{fmt(d.value / total)}</span>
          </div>
        </li>
      )
    })}
  </ul>
)

NibrsStackedBarDetails.propTypes = {
  colorMap: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
}

export default NibrsStackedBarDetails
