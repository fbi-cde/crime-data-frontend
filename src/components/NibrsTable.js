import { format } from 'd3-format'
import PropTypes from 'prop-types'
import React from 'react'

const fmt = format(',')

const NibrsTable = ({ data, title }) => {
  const agg = (a, b) => a + b.count
  const total = data.reduce(agg, 0)

  return (
    <div>
      {title &&
        <div className="px2 py1 bold line-height-1 bg-blue-lighter">
          {title}
        </div>}
      <table className="fs-12 table-striped">
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="pl4 lh-24">{d.key}</td>
              <td className="pr4 lh-24 right-align">{fmt(d.count)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="pl4 lh-32 border-top border-blue-lighter">Total</td>
            <td className="pr4 lh-32 right-align border-top border-blue-lighter">
              {fmt(total)}
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
