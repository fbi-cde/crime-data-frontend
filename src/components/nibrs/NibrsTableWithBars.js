import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

import NibrsCountPercentToggle from './NibrsCountPercentToggle'
import { formatNum, formatPerc, formatSI } from '../../util/formats'

class NibrsTableWithBars extends React.Component {
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
      id,
      noun,
      rowLim,
      sentenceStart,
      sortByValue,
      title,
    } = this.props
    const { isCounts } = this.state

    const agg = (a, b) => a + b.count
    const total = data.reduce(agg, 0)
    console.log('NibrsTableWithBars:', data)
    let dataMunged = [...data.filter(d => d.key)]
    dataMunged.sort((a, b) => +b.count - +a.count)

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

    if (!sortByValue) dataFormatted.sort((a, b) => a.key > b.key)

    return (
      <div id={id}>
        <div className="clearfix">
          <div className="left">
            <div className="blue bold">
              {title}
            </div>
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
          {title &&
            <caption className="hide">
              {title}
            </caption>}
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
        <div className="mt-tiny fs-14 mb3">
          {sentenceStart} was reported for{' '}
          <span className="bold red">{formatNum(total)}</span> {pluralize(noun)}.
        </div>
      </div>
    )
  }
}

NibrsTableWithBars.defaultProps = {
  noun: 'incident',
  rowLim: 12,
}

NibrsTableWithBars.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  noun: PropTypes.string.isRequired,
  rowLim: PropTypes.number.isRequired,
  title: PropTypes.string,
}

export default NibrsTableWithBars
