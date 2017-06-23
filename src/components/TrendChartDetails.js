import { format } from 'd3-format'
import range from 'lodash.range'
import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import uniq from 'lodash.uniqby'
import PropTypes from 'prop-types'
import React from 'react'

import Highlight from './Highlight'
import Term from './Term'
import mapCrimeToGlossaryTerm from '../util/glossary'
import { nationalKey } from '../util/usa'

const formatRate = format(',.1f')
const formatTotal = format(',.0f')

const getComparison = ({ place, data }) => {
  const threshold = 3
  const placeRate = data.find(d => d.place === place).rate
  const nationalRate = data.find(d => d.place === nationalKey).rate
  const diff = (placeRate / nationalRate - 1) * 100

  return Math.abs(diff) < threshold
    ? <span>about the same (within {threshold}%) as</span>
    : <span>
        {<Highlight text={`${diff > 0 ? 'higher' : 'lower'}`} />} than
      </span>
}

const TrendChartDetails = ({
  colors,
  crime,
  data,
  since,
  until,
  updateYear,
}) => {
  const keys = uniq(data.map(d => d.place))
  const isOnlyNational = keys.length === 1
  const place = isOnlyNational ? nationalKey : keys.find(k => k !== nationalKey)
  const comparison = getComparison({ place, data })
  const rate = data.find(d => d.place === place).rate
  const year = data.find(d => d.place === place).date.getFullYear()
  const yearRange = range(since, until + 1)
  const handleSelectChange = e => updateYear(Number(e.target.value))

  const borderColor = { borderColor: '#c8d3dd' }
  const cellStyle = { width: 68, ...borderColor }

  const term = (
    <Term id={mapCrimeToGlossaryTerm(crime)} size="sm">{lowerCase(crime)}</Term>
  )

  return (
    <div className="mb3 sm-mb5 lg-flex">
      <div className="flex-auto">
        <p className="mb1 lg-m0 lg-pr5 lg-mh-72p fs-14">
          {isOnlyNational &&
            <span>
              In {<Highlight text={year} />}, there were{' '}
              {<Highlight text={formatRate(rate)} />}{' '}
              incidents of {term}{' '}
              per 100,000 people.
            </span>}
          {!isOnlyNational &&
            <span>
              In {<Highlight text={year} />}, {startCase(keys[0])}’s {term} rate
              was{' '}
              {<Highlight text={formatRate(rate)} />}{' '}
              incidents per 100,000 people.
              The rate for that year was {comparison} that of the United States.
            </span>}
        </p>
      </div>
      <div className="flex-none overflow-auto">
        <table className="mb1 lg-m0 p2 col-12 sm-col-5 bg-blue-white rounded">
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
                  {yearRange.map((y, i) => <option key={i}>{y}</option>)}
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
              <tr key={i}>
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
                  {startCase(d.place)}
                </td>
                <td className="pt1 pr2 align-bottom right-align">
                  <span
                    className="inline-block border-bottom"
                    style={cellStyle}
                  >
                    {formatRate(d.rate)}
                  </span>
                </td>
                <td className="pt1 pr2 align-bottom right-align">
                  <span
                    className="inline-block border-bottom"
                    style={cellStyle}
                  >
                    {formatTotal(d.count)}
                  </span>
                </td>
                <td
                  className="pt1 pl2 align-bottom right-align border-left"
                  style={borderColor}
                >
                  <span
                    className="inline-block border-bottom"
                    style={cellStyle}
                  >
                    {formatTotal(d.population)}
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
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  crime: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  updateYear: PropTypes.func.isRequired,
}

export default TrendChartDetails
