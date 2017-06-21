import { format } from 'd3-format'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

const formatNumber = format(',')
const formatPercent = p => (+p > 0.01 ? format('.0%')(p) : '<1%')
const formatSI = n => (+n > 10000 ? format('.2s')(n) : formatNumber(n))

class NibrsTableWithBars extends React.Component {
  state = { showCounts: false }

  showCounts = e => {
    e.preventDefault()
    this.setState({ showCounts: true })
  }

  showPercents = e => {
    e.preventDefault()
    this.setState({ showCounts: false })
  }

  render() {
    const { data, noun, rowLim, title } = this.props
    const { showCounts } = this.state
    const btnClass =
      'btn btn-primary p0 ml-tiny line-height-4 sans-serif regular'

    const agg = (a, b) => a + b.count
    const total = data.reduce(agg, 0)

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
        percentFmt: formatPercent(p),
      }
    })

    return (
      <div>
        <table className="my2 table-fixed">
          {title &&
            <caption className="left-align">
              <div className="blue bold">{title}</div>
            </caption>}
          <thead className="v-hide">
            <tr style={{ lineHeight: '16px' }}>
              <th style={{ width: '15%' }} />
              <th style={{ width: '20%' }}>
                {showCounts ? 'Count' : 'Percent'}
              </th>
              <th style={{ width: '65%' }}>{title}</th>
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
                  {showCounts ? d.countFmt : d.percentFmt}
                </td>
                <td className="px1" title={d.key}>
                  {d.key.replace && d.key.replace(/\//g, ' / ')}
                </td>
              </tr>,
            )}
          </tbody>
        </table>
        <div className="mt-tiny fs-14 mb3">
          {/* eslint max-len: 0 */}
          There were
          {' '}
          <span className="bold red">{formatNumber(total)}</span>
          {' '}
          reported
          {' '}
          {pluralize(noun)}
          .
        </div>
        <div className="clearfix">
          <div className="right mt-tiny fs-10 italic serif">
            View by
            <button
              className={`${btnClass} ${!showCounts &&
                'bg-white blue border-blue'}`}
              onClick={this.showCounts}
              style={{ width: 18 }}
            >
              #
            </button>
            <button
              className={`${btnClass} ${showCounts &&
                'bg-white blue border-blue'}`}
              onClick={this.showPercents}
              style={{ width: 18 }}
            >
              %
            </button>
          </div>
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
  noun: PropTypes.string.isRequired,
  rowLim: PropTypes.number.isRequired,
  title: PropTypes.string,
}

export default NibrsTableWithBars
