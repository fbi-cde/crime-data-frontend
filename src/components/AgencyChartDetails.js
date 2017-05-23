import React from 'react'

const highlight = v => <span className="bold blue">{v}</span>

const AgencyChartDetails = ({ colors, crime, data, keys }) => {
  const { year, reported } = data

  return (
    <div className="mb3 lg-flex">
      <div className="mb1 sm-mr7 flex-auto">
        In {highlight(year)}, there were {highlight(reported)}{' '}
        incidents of {crime} reported, which was an [increase] from
        the previous year.
      </div>
      <div className="flex-none" style={{ width: 210 }}>
        <table className="mb1 lg-m0 p2 bg-blue-white">
          <thead className="fs-12">
            <tr>
              <th>
                <select className="field field-sm select select-dark col-10">
                  <option>{year}</option>
                </select>
              </th>
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
                  {k}
                </td>
                <td className="pt1 line-height-4 align-bottom right-align">
                  <span className="inline-block border-bottom border-blue-light col-12">
                    {data[k]}
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
