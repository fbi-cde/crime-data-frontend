import { format } from 'd3-format'
import PropTypes from 'prop-types'
import React from 'react'

const fmt = format(',')

const AgencyTable = ({ data, title }) => {
  const total = data.map(d => d[1]).reduce((a, b) => a + b, 0)

  return (
    <div>
      <div className="px2 py1 bold line-height-1 bg-blue-lighter">{title}</div>
      <table className="fs-12 table-striped">
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td className="pl4 lh-24">{d[0]}</td>
              <td className="pr4 lh-24 right-align">{fmt(d[1])}</td>
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

AgencyTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array),
  title: PropTypes.string,
}

export default AgencyTable
