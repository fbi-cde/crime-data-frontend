import range from 'lodash.range'
import PropTypes from 'prop-types'
import React from 'react'

import Highlight from './Highlight'
import crimeTerm from '../util/glossary'
import { formatNum, formatOneDec as formatRate } from '../util/formats'
import { nationalKey } from '../util/usa'
import generateId from '../util/id'
import { generateDisplayName } from '../util/location'

const highlight = txt =>
  <strong>
    {txt}
  </strong>
const borderColor = { borderColor: '#c8d3dd' }
const cellStyle = { width: 68, ...borderColor }

const getComparison = ({ place, data }) => {
  const threshold = 3
  const placeRate = data.find(d => d.place === place).rate
  const nationalRate = data.find(d => d.place === nationalKey).rate
  const diff = (placeRate / nationalRate - 1) * 100

  return Math.abs(diff) < threshold
    ? <span>
        about the same (within {threshold}%) as
      </span>
    : <span>
        {<Highlight text={`${diff > 0 ? 'higher' : 'lower'}`} />} than
      </span>
}

const HorizontalBarChartDetails = ({
  active,
  ratePer,
  colors,
  subject,
  keys,
  since,
  until,
  onChangeYear,
  placeName,
  placeType,
}) => {
  const handleSelectChange = e => onChangeYear(Number(e.target.value))
  const yearRange = range(since, until + 1)
  const term = crimeTerm(subject)
  const data = active.filter(d => d.crime !== 'rape-revised')
  const isNational = keys.length === 1
  const place = isNational ? nationalKey : keys.find(k => k !== nationalKey)
  const comparison = getComparison({ place, data })
  const { rate, year } = data.find(d => d.place === place) || {}
  const crimeId = `${subject}-hbar-chart-details`

  let sentence
  if (isNational) {
    sentence = (
      <span>
        In <span id="selected-year-text">{highlight(year)}</span>,{' '}
        the {term} rate was{' '}
        {highlight(formatRate(rate))} per {ratePer} inhabitants.
      </span>
    )
  } else {
    sentence = (
      <span>
        In <span id="selected-year-text">{highlight(year)}</span>,{' '}
        {placeName}’s {term} rate was{' '}
        {highlight(formatRate(rate))} per {ratePer} inhabitants. The rate for
        that year was {comparison} that of the United States.
      </span>
    )
  }

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

HorizontalBarChartDetails.propTypes = {
  active: PropTypes.arrayOf(PropTypes.object).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  subject: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  placeName: PropTypes.string.isRequired,
}

export default HorizontalBarChartDetails
