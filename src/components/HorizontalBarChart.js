import PropTypes from 'prop-types'
import React from 'react'

import HorizontalBarChartDetails from './HorizontalBarChartDetails'

import { formatPerc, formatSI, formatYear } from '../util/formats'

class HorizontalBarChart extends React.Component {
  state = { isCounts: false }

  showCounts = e => {
    e.preventDefault()
    this.setState({ isCounts: true })
  }

  showPercents = e => {
    e.preventDefault()
    this.setState({ isCounts: false })
  }

  createSeries = () => {
    const { id, data, places } = this.props
    const crimes = [id]
    const dataByYear = data.map(d => ({ ...d, date: formatYear(d.year) }))
    return places
      .map(place =>
        crimes.map(c => {
          const values = dataByYear
            .filter(d => d[place][c] && d[place][c].count)
            .map(d => ({
              date: d.date,
              year: d.year,
              population: d[place].population,
              ...d[place][c],
            }))
          return { crime: c, place, values }
        }),
      )
      .reduce((a, n) => a.concat(n), [])
  }

  render() {
    const {
      data,
      ratePer,
      id,
      rowLim,
      sortByKey,
      initialYearSelected,
      onChangeYear: handleChangeYear,
      title,
      filters,
      place,
      placeName,
      places,
      isAgency,
    } = this.props
    const { isCounts } = this.state

    const dataByYear = data.filter(d => d.year === initialYearSelected)
    const dataDetails = dataByYear[0][place][id].details

    const agg = (a, b) => a + b.count
    const total = dataDetails.reduce(agg, 0)

    let dataMunged = [...dataDetails.filter(d => d.key)]

    if (dataMunged.length > rowLim) {
      const other = dataMunged.slice(rowLim)

      dataMunged = [
        ...dataMunged.slice(0, rowLim),
        {
          key: `Other (${other.length})`,
          count: other.reduce(agg, 0),
          children: [...other],
        },
      ]
    }

    const dataFormatted = dataMunged.map(d => {
      const p = d.count / total
      return {
        ...d,
        percent: p,
        countFmt: formatSI(d.count),
        percentFmt: formatPerc(p),
      }
    })

    if (sortByKey) dataFormatted.sort((a, b) => a.key > b.key)

    const series = this.createSeries()

    const active = series.map(s => {
      const { values } = s
      const activeValue = initialYearSelected
        ? values.find(v => v.year === initialYearSelected)
        : values[values.length - 1]

      return {
        crime: s.crime,
        place: s.place,
        ...activeValue,
      }
    })

    const colors = ['#ff5e50', '#95aabc', '#52687d']
    const subject = id

    return (
      <div id={id}>
        <HorizontalBarChartDetails
          active={active}
          ratePer={ratePer}
          colors={colors}
          subject={subject}
          keys={places}
          since={filters.since}
          onChangeYear={handleChangeYear}
          until={filters.until}
          placeName={placeName}
          placeType={filters.placeType}
          isAgency={isAgency}
        />
        <div className="clearfix">
          <div className="left">
            <div className="blue bold">
              {title}
            </div>
          </div>
        </div>
        <table className="mt1 mb2 table-fixed" id={id}>
          <thead className="v-hide">
            <tr style={{ lineHeight: '16px' }}>
              <th style={{ width: '15%' }} />
              <th style={{ width: '20%' }}>
                {isCounts ? 'Count' : 'Percent'}
              </th>
              <th style={{ width: '65%' }}>
                {title}
              </th>
            </tr>
          </thead>
          <tbody>
            {dataFormatted.map((d, i) =>
              <tr key={i} className="fs-14">
                <td className="border-right border-gray">
                  <div className="progress-bar my1">
                    <span
                      className="rtl"
                      style={{ width: `${d.percent * 100}%` }}
                    />
                  </div>
                </td>
                <td className="pr-tiny bold monospace right-align">
                  {isCounts ? d.countFmt : d.percentFmt}
                </td>
                <td className="px1" title={d.key}>
                  {d.key.replace && d.key.replace(/\//g, ' / ')}
                </td>
              </tr>,
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

HorizontalBarChart.defaultProps = {
  rowLim: 12,
}

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  rowLim: PropTypes.number.isRequired,
  title: PropTypes.string,
  isAgency: PropTypes.bool.isRequired,
}

export default HorizontalBarChart
