import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import range from 'lodash.range'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'
import generateId from '../../util/id'
import mapReported from '../../util/termResolver'

import Term from '../Term'
import { formatNum as fmt } from '../../util/formats'

const highlight = txt =>
  <strong>
    {txt}
  </strong>

const SHRTrendChartDetails = ({
  colors,
  crime,
  data,
  dataPrior,
  keys,
  since,
  until,
  updateYear,
}) => {
  const { victim, offender, year } = data
  const yearRange = range(since, until + 1)
  const crimeDisplay = lowerCase(crime)
  const handleSelectChange = e => updateYear(Number(e.target.value))
  let compSentence = null
  const vicLastYear = dataPrior && dataPrior.victim
  const offLastYear = dataPrior && dataPrior.offender


  if (vicLastYear && victim.count > 0 && offLastYear && offender.count > 0) {
    const vicComp = victim.count > vicLastYear.count ? 'increased' : 'decreased'
    const offComp = offender.count > offLastYear.count ? 'increased' : 'decreased'

    compSentence = (
      <span>
        Victim Counts {highlight(vicComp)} from the previous year. {' '}
        Offender Counts {highlight(offComp)} from the previous year.
      </span>
    )
  }

  return (
    <div className="mb3 lg-flex">
      <div className="mb2 sm-mb0 sm-mr7 flex-auto">
        <p className="m0" style={{ maxWidth: 400 }}>
          In <span id="selected-year-text">{highlight(year)}</span>, there{' '}
          {pluralize('were', victim.count)} {highlight(fmt(victim.count))}{' '}
          {pluralize('victim', victim.count)} {' '}, and {pluralize('were', offender.count)} {highlight(fmt(offender.count))}{' '}
            {pluralize('victim', offender.count)} {' '} of {crimeDisplay}. {compSentence}
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
                  {yearRange.map((y, i) =>
                    <option key={i}>
                      {y}
                    </option>,
                  )}
                </select>
              </td>
              <th className="right-align">
                {'counts'}
              </th>
            </tr>
          </thead>
          <tbody className="fs-14 bold">
            {keys.map((k, i) =>
              <tr key={i}>
                <td className="pr2 sm-pr3 fs-12 nowrap truncate align-bottom col-8">
                  <span
                    className="mr1 inline-block"
                    style={{ width: 8, height: 8, backgroundColor: colors(k) }}
                  />
                  <Term id={k} size="sm">
                    {startCase(mapReported(k))}
                  </Term>
                </td>
                <td className="pt1 line-height-4 align-bottom right-align">
                  <span
                    className="inline-block border-bottom border-blue-light col-12"
                    id={generateId(`${k}-agency-chart-column`)}
                  >
                    {fmt(data[k].count)}
                  </span>
                </td>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

SHRTrendChartDetails.propTypes = {
  colors: PropTypes.func.isRequired,
  crime: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  dataPrior: PropTypes.object,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  updateYear: PropTypes.func.isRequired,
}

export default SHRTrendChartDetails
