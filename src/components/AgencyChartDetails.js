import { format } from 'd3-format'
import range from 'lodash.range'
import React from 'react'

import Term from './Term'

const fmt = format(',')

const AgencyChartDetails = ({
  colors,
  crime,
  data,
  keys,
  since,
  until,
  updateYear,
}) => {
  const { cleared, year, reported } = data
  const yearRange = range(since, until + 1)
  const handleSelectChange = e => updateYear(Number(e.target.value))

  return (
    <div className="mb3 lg-flex">
      <div className="mb2 sm-mb0 sm-mr7 flex-auto">
        <p className="m0" style={{ maxWidth: 400 }}>
          In <strong>{year}</strong>, there were{' '}
          <strong>{fmt(reported)}</strong> reported and{' '}
          <strong>{fmt(cleared)}</strong> cleared incidents{' '}
          of {crime}.
        </p>
      </div>
      <div className="flex-none" style={{ width: 210 }}>
        <table className="mb1 lg-m0 p2 bg-blue-white">
          <thead className="fs-12">
            <tr>
              <td className="left-align">
                <label htmlFor="year-selected" className="hide">
                  Year selected
                </label>
                <select
                  className="field field-sm select select-dark col-10"
                  id="year-selected"
                  onChange={handleSelectChange}
                  value={year}
                >
                  {yearRange.map((y, i) => <option key={i}>{y}</option>)}
                </select>
              </td>
              <th className="right-align">Incidents</th>
            </tr>
          </thead>
          <tbody className="fs-14 bold">
            {keys.map((k, i) => (
              <tr key={i}>
                <td className="pr2 sm-pr3 fs-12 nowrap truncate align-bottom col-8">
                  <span
                    className="mr1 inline-block"
                    style={{ width: 8, height: 8, backgroundColor: colors(k) }}
                  />
                  <Term id={k}>{k}</Term>
                </td>
                <td className="pt1 line-height-4 align-bottom right-align">
                  <span className="inline-block border-bottom border-blue-light col-12">
                    {fmt(data[k])}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AgencyChartDetails
