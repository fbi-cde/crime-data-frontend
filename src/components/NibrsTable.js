import PropTypes from 'prop-types'
import React from 'react'

import { formatNum } from '../util/formats'

const NibrsTable = ({ data, title, sortByValue }) => {
  const agg = (a, b) => a + b.count
  const total = data.reduce(agg, 0)

  if (sortByValue) data.sort((a, b) => +b.count - +a.count)

  return (
    <div className="mb3">
      {title &&
        <div className="mb1 fs-16 bold blue">
          {title}
        </div>}
      <table className="fs-12 table-striped">
        <tbody>
          {data.filter(d => d.key).map((d, i) =>
            <tr key={i}>
              <td className="pl1 lh-24">
                {d.key}
              </td>
              <td className="pr2 lh-24 right-align">
                {formatNum(d.count)}
              </td>
            </tr>,
          )}
        </tbody>
        <tfoot>
          <tr>
            <td className="pl1 lh-24 border-top border-blue-lighter">Total</td>
            <td className="pr2 lh-24 right-align border-top border-blue-lighter">
              {formatNum(total)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

NibrsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default NibrsTable
