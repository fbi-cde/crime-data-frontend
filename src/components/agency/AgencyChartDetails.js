import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
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

const AgencyChartDetails = ({
  colors,
  crime,
  data,
  dataPrior,
  keys,
  noun,
  yrRange,
  updateYear,
  nibrsDetails,
}) => {
  const crimeDisplay = lowerCase(crime)
  const handleSelectChange = e => updateYear(Number(e.target.value))
  let compSentence = null
  const { year } = data
  let actualLastYr
  let comp
  let cleared
  let actual
  let value
  if (!nibrsDetails) {
    cleared = data.cleared
    actual = data.actual
    actualLastYr = dataPrior && dataPrior.actual
    if (actualLastYr && actual.count > 0) {
       comp = actual.count > actualLastYr.count ? 'increased' : 'decreased'
      compSentence = (
        <span>
          Reported {noun} {highlight(comp)} from the previous year.
        </span>
      )
    }
  } else {
    value = data.value
    const valueLastYear = dataPrior && dataPrior.value
    if (valueLastYear && value > 0) {
       comp = value > valueLastYear.value ? 'increased' : 'decreased'
      compSentence = (
        <span>
          Reported {noun} {highlight(comp)} from the previous year.
        </span>
      )
    }
  }

  return (
    <div className="mb3 lg-flex">
      <div className="mb2 sm-mb0 sm-mr7 flex-auto">
        {!nibrsDetails ?
          <p className="m0" style={{ maxWidth: 400 }}>
            In <span id="selected-year-text">{highlight(year)}</span>, there{' '}
            {pluralize('were', actual)} {highlight(fmt(actual))}{' '}
            reported {pluralize(noun, actual)} of {crimeDisplay}. There{' '}
            {pluralize('were', cleared)} {highlight(fmt(cleared))}{' '}
            cleared {crimeDisplay} {pluralize(noun, cleared)}. Crimes are
            not necessarily cleared in the year they occur. {compSentence}
          </p> :
          <p className="m0" style={{ maxWidth: 400 }}>
            In <span id="selected-year-text">{highlight(year)}</span>, there{' '}
            {pluralize('were', value)} {highlight(fmt(value))}{' '}
            reported {pluralize(noun, value)} of {crimeDisplay}.
          </p> }
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
                  {yrRange.map((y, i) =>
                    <option key={i}>
                      {y}
                    </option>,
                  )}
                </select>
              </td>
              <th className="right-align">
                {startCase(noun)}
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
                  <Term id={mapReported(k)} size="sm">
                    {startCase(mapReported(k))}
                  </Term>
                </td>
                <td className="pt1 line-height-4 align-bottom right-align">
                  <span
                    className="inline-block border-bottom border-blue-light col-12"
                    id={generateId(`${k}-agency-chart-column`)}
                  >
                    {fmt(data[k])}
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

AgencyChartDetails.propTypes = {
  colors: PropTypes.func.isRequired,
  crime: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  dataPrior: PropTypes.object,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  yrRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  noun: PropTypes.string.isRequired,
  updateYear: PropTypes.func.isRequired,
  nibrsDetails: PropTypes.bool.isRequired,
}

export default AgencyChartDetails
