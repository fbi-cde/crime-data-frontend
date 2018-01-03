import range from 'lodash.range'
import lowerCase from 'lodash.lowercase'
import PropTypes from 'prop-types'
import React from 'react'

import Highlight from '../Highlight'
import Term from '../Term'
import crimeTerm from '../../util/glossary'
import { formatNum, formatOneDec as formatRate } from '../../util/formats'
import { nationalKey } from '../../util/usa'
import generateId from '../../util/id'
import { generateDisplayName } from '../../util/location'

const highlight = txt =>
  <strong>
    {txt}
  </strong>
const borderColor = { borderColor: '#c8d3dd' }
const cellStyle = { width: 68, ...borderColor }

const TrendChartDetails = ({
  active,
  colors,
  crime,
  keys,
  since,
  until,
  onChangeYear,
  placeType,
}) => {
  const handleSelectChange = e => onChangeYear(Number(e.target.value))
  const yearRange = range(since, until + 1)
  const term = (
    <Term id={crimeTerm(crime)} size="sm">
      {lowerCase(crime)}
    </Term>
  )

  const data = active.filter(d => d.crime !== 'rape-revised')
  const year = data.find(d => d.place === keys[0]).year
  const rate1 = data.find(d => d.place === keys[0]).rate
  const rate2 = data.find(d => d.place === keys[0]).rate

  const crimeId = `${crime}-trend-chart-details`


  const sentence = (
      <span>
        In {highlight(year)}, there were {highlight(formatRate(rate1))} {keys[0]}
        of {term} per 100,000 people, and there were {highlight(formatRate(rate2))} {keys[1]}
        of {term} per 100,000 people.
      </span>
    )


  return (
    <div className="mb3 sm-mb5 lg-flex trend-chart-details">
      <div className="flex-auto">
        <p className="mb2 lg-m0 lg-pr5 lg-mh-88p fs-14">
          {sentence}
        </p>
      </div>
      <div
        id={crimeId}
        className="flex-none inline-block mw-fill overflow-auto bg-blue-white rounded"
      >
        <table className="p2 sm-col-5">
          <thead className="fs-10 line-height-4 right-align">
            <tr>
              <td className="left-align">
                <label htmlFor="year-selected" className="hide">
                  Year selected
                </label>
                <select
                  className="col-12 field select select-sm select-dark fs-12"
                  id="year-selected"
                  style={{ width: 100 }}
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
              <td className="pr2 align-middle">Rate</td>
              <td className="pr2 align-middle">Total</td>
              <td className="pl2 align-middle border-left" style={borderColor}>
                Population
              </td>
            </tr>
          </thead>
          <tbody className="fs-12 bold line-height-4">
            {data.map((d, i) =>
              <tr key={i} id={generateId(`${d.place}-trend-chart-details-row`)}>
                <td
                  className="pr2 nowrap truncate align-bottom"
                  style={{ maxWidth: 125 }}
                >
                  <span
                    className="mr1 inline-block circle"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: colors[i] || '#000',
                    }}
                  />
                  {generateDisplayName(d.place, placeType)}
                </td>
                <td className="pt1 pr2 align-bottom right-align">
                  <span
                    id={generateId(`${d.place}-trend-chart-details-row-rate`)}
                    className="inline-block border-bottom"
                    style={cellStyle}
                  >
                    {formatRate(d.rate)}
                  </span>
                </td>
                <td className="pt1 pr2 align-bottom right-align">
                  <span
                    id={generateId(`${d.place}-trend-chart-details-row-count`)}
                    className="inline-block border-bottom"
                    style={cellStyle}
                  >
                    {formatNum(d.count)}
                  </span>
                </td>
                <td
                  className="pt1 pl2 align-bottom right-align border-left"
                  style={borderColor}
                >
                  <span
                    id={generateId(
                      `${d.place}-trend-chart-details-row-population`,
                    )}
                    className="inline-block border-bottom"
                    style={cellStyle}
                  >
                    {formatNum(d.population)}
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

TrendChartDetails.propTypes = {
  active: PropTypes.arrayOf(PropTypes.object).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  crime: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  onChangeYear: PropTypes.func.isRequired,
}

export default TrendChartDetails
