import PropTypes from 'prop-types'
import React from 'react'

import { formatNum, formatPerc } from '../util/formats'

const NibrsStackedBarDetails = ({ colorMap, data, isCounts, total }) =>
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
            <span>
              {d.key}
            </span>
            <span className="bold monospace">
              {isCounts ? formatNum(d.value) : formatPerc(d.value / total)}
            </span>
          </div>
        </li>
      )
    })}
  </ul>

NibrsStackedBarDetails.propTypes = {
  colorMap: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCounts: PropTypes.bool,
  total: PropTypes.number.isRequired,
}

NibrsStackedBarDetails.defaultProps = {
  isCounts: false,
}

export default NibrsStackedBarDetails
