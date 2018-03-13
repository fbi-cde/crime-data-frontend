import PropTypes from 'prop-types'
import React from 'react'
import snakeCase from 'lodash.snakecase'
import pluralize from 'pluralize'

import NibrsCountPercentToggle from '../nibrs/NibrsCountPercentToggle'
import { formatNum, formatPerc, formatSI } from '../../util/formats'
import NoDataCard from './NoDataCard'

class BarChart extends React.Component {
  state = { isCounts: false }

  showCounts = e => {
    e.preventDefault()
    this.setState({ isCounts: true })
  }

  showPercents = e => {
    e.preventDefault()
    this.setState({ isCounts: false })
  }

  render() {
    const {
      data,
      year
    } = this.props
    const id = snakeCase(data.ui_text)

    const { isCounts } = this.state


    const fitleredDataByYear = data.data.filter(d => d.data_year === year)
    if (fitleredDataByYear.length === 0) {
      return (<NoDataCard noun={data.title} year={year} />)
    }
    const agg = (a, b) => a + b.value
    const total = fitleredDataByYear.reduce(agg, 0)
    const dataFormatted = fitleredDataByYear.map(d => {
      const p = d.value / total
      return {
          ...d,
          percent: p,
          countFmt: formatSI(d.value),
          percentFmt: formatPerc(p),

      }
    })

    if (!data.title.includes('Age')) { dataFormatted.sort((a, b) => a.value < b.value) }

    return (
      <div id={id}>
        <div className="clearfix">
          <div className="left">
            <div className="blue bold" />
          </div>
          <div className="right">
            <NibrsCountPercentToggle
              ariaControls={id}
              isCounts={isCounts}
              showCounts={this.showCounts}
              showPercents={this.showPercents}
            />
          </div>
        </div>
        <table className="mt1 mb2 table-fixed" id={id}>
          {data.title &&
            <caption className="hide">
              {data.title}
            </caption>}
          <thead className="v-hide">
            <tr style={{ lineHeight: '16px' }}>
              <th style={{ width: '15%' }} />
              <th style={{ width: '20%' }}>
                {isCounts ? 'Count' : 'Percent'}
              </th>
              <th style={{ width: '65%' }}>
                {data.title}
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
        <div className="mt-tiny fs-14 mb3">
          {data.short_title ? data.short_title : data.title} was reported for{' '}
          <span className="bold red">{formatNum(total)}</span> {pluralize(data.noun, total)}.
        </div>
      </div>
    )
  }
}

BarChart.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
}

export default BarChart
