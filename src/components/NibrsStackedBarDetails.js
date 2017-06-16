import { format } from 'd3-format'
import PropTypes from 'prop-types'
import React from 'react'

const fmt = p => (p > 0.01 ? format('.0%')(p) : '<1%')

const NibrsStackedBarDetails = ({
  colorMap,
  data,
  onMouseOver,
  onMouseOut,
  selected,
  total,
}) =>
  <ul className="list-style-none p0 m0 fs-14">
    {data.map((d, i) => {
      const active = d.key === selected
      const border = active ? 'border-bottom' : 'border-bottom-dashed'
      const notLast = i + 1 !== data.length
      return (
        <li
          key={d.key}
          className={`${notLast
            ? 'mb1'
            : ''} flex items-baseline cursor-pointer ${border}`}
          onMouseOver={onMouseOver(d.key)}
          onMouseOut={onMouseOut}
        >
          <span
            className="mr1"
            style={{ width: 10, height: 10, backgroundColor: colorMap(d.key) }}
          />
          <div className={`flex flex-auto justify-between ${active && 'bold'}`}>
            <span>{d.key}</span>
            <span className="monospace">{fmt(d.value / total)}</span>
          </div>
        </li>
      )
    })}
  </ul>

NibrsStackedBarDetails.propTypes = {
  colorMap: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  selected: PropTypes.string,
  total: PropTypes.number.isRequired,
}

export default NibrsStackedBarDetails
