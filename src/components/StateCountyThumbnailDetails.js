import range from 'lodash.range'
import PropTypes from 'prop-types'
import React from 'react'
import { sentenceCase } from '../util/text'
import { formatNum, formatOneDec as formatRate } from '../util/formats'
import generateId from '../util/id'

const borderColor = { borderColor: '#c8d3dd' }

const calculateRate = (population, count) => count / population * 100000
const cellStyle = { width: 68, ...borderColor }

const StateCountyThumbnailDetails = ({
  since,
  until,
  selectedYear,
  selectedLocation,
  selectedCountyString,
  onChangeYear,
  onChangeLocation,
  countyData,
  stateData,
  colors
}) => {
  const yearRange = range(since, until + 1)
  console.log(
    'Selected Location County Data:',
    selectedLocation,
    sentenceCase(selectedLocation.county_name)
  )

  const handleYearSelectChange = e => onChangeYear(Number(e.target.value))
  const handleLocationSelectChange = e =>
    onChangeLocation(String(e.target.value))

  return (
    <div className="mb3 sm-mb5 trend-chart-details">
      <div className="flex-none inline-block mw-fill overflow-auto bg-blue-white rounded">
        <table className="p2 sm-col-5">
          <thead className="fs-10 line-height-4 ">
            <tr>
              <td className="pr4 align-middle">
                <label htmlFor="location-selected" className="hide">
                  Location selected
                </label>
                <select
                  className="col-12 field select fs-14 field-sm select border-blue"
                  id="location-selected"
                  style={{ width: 200 }}
                  onChange={handleLocationSelectChange}
                  value={selectedCountyString}
                >
                  {countyData.map((y, i) => (
                    <option key={i}>{sentenceCase(y.county_name)}</option>
                  ))}
                </select>
              </td>
              <td className="pr2 align-middle">
                <label htmlFor="year-selected" className="hide">
                  Year selected
                </label>
                <select
                  className="col-12 field select field-sm select-dark fs-12 border-blue"
                  id="year-selected"
                  style={{ width: 75 }}
                  onChange={handleYearSelectChange}
                  value={selectedYear}
                >
                  {yearRange.map((y, i) => <option key={i}>{y}</option>)}
                </select>
              </td>
            </tr>
          </thead>
        </table>
        <table className="p2 sm-col-5">
          <thead className="fs-10 line-height-4 right-align">
            <tr>
              <td className="pr8 align-right" />
              <td className="pr2 align-right">Rate</td>
              <td className="pr2 align-right">Total</td>
              <td className="pl2 align-righzzt border-left" style={borderColor}>
                Population
              </td>
            </tr>
          </thead>
          <tbody className="fs-12 bold line-height-4">
            <tr id={generateId('state-county-chart-details-row')}>
              <td
                className="pr1 nowrap truncate align-bottom"
                style={{ maxWidth: 125 }}
              >
                <span
                  className="mr1 inline-block circle"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: colors[1] || '#000'
                  }}
                />
                {stateData.name}
              </td>
              <td className="pt1 pr1 align-bottom right-align">
                <span
                  id={generateId(
                    `${stateData.name}-trend-chart-details-row-rate`
                  )}
                  className="inline-block border-bottom"
                  style={cellStyle}
                >
                  {formatRate(
                    calculateRate(
                      stateData.population,
                      stateData.actual_incident_count
                    )
                  )}
                </span>
              </td>
              <td className="pt1 pr1 align-bottom right-align">
                <span
                  id={generateId(
                    `${stateData.name}-trend-chart-details-row-count`
                  )}
                  className="inline-block border-bottom"
                  style={cellStyle}
                >
                  {formatNum(stateData.actual_incident_count)}
                </span>
              </td>
              <td
                className="pt1 pl2 align-bottom right-align border-left"
                style={borderColor}
              >
                <span
                  id={generateId(
                    `${stateData.name}-trend-chart-details-row-population`
                  )}
                  className="inline-block border-bottom"
                  style={cellStyle}
                >
                  {formatNum(stateData.population)}
                </span>
              </td>
            </tr>
            <tr id={generateId('state-county-chart-details-row')}>
              <td
                className="pr1 nowrap truncate align-bottom"
                style={{ maxWidth: 125 }}
              >
                <span
                  className="mr1 inline-block circle"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: colors[0] || '#000'
                  }}
                />
                {sentenceCase(selectedLocation.county_name)}
              </td>
              <td className="pt1 pr1 align-bottom right-align">
                <span
                  id={generateId(
                    `${
                      selectedLocation.county_name
                    }-trend-chart-details-row-rate`
                  )}
                  className="inline-block border-bottom"
                  style={cellStyle}
                >
                  {selectedLocation.rate}
                </span>
              </td>
              <td className="pt1 pr1 align-bottom right-align">
                <span
                  id={generateId(
                    `${
                      selectedLocation.county_name
                    }-trend-chart-details-row-count`
                  )}
                  className="inline-block border-bottom"
                  style={cellStyle}
                >
                  {formatNum(selectedLocation.actual_incident_count)}
                </span>
              </td>
              <td
                className="pt1 pl2 align-bottom right-align border-left"
                style={borderColor}
              >
                <span
                  id={generateId(
                    `${
                      selectedLocation.county_name
                    }-trend-chart-details-row-population`
                  )}
                  className="inline-block border-bottom"
                  style={cellStyle}
                >
                  {formatNum(selectedLocation.population)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="sm-col mb1 sm-m0 fs-12 bold monospace black">
        Rate per 100,000 people, by year
      </div>
    </div>
  )
}

StateCountyThumbnailDetails.propTypes = {
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  selectedLocation: PropTypes.object.isRequired,
  onChangeYear: PropTypes.func.isRequired,
  onChangeLocation: PropTypes.func.isRequired,
  countyData: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired,
  selectedCountyString: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired
}

StateCountyThumbnailDetails.defaultProps = {
  colors: ['#ff5e50', '#95aabc', '#52687d']
}

export default StateCountyThumbnailDetails
