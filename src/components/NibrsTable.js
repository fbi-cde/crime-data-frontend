import { format } from 'd3-format'
import React from 'react'

import DownloadDataBtn from './DownloadDataBtn'

const formatNumber = format(',')
const formatPercent = p => (p > 0.01 ? format('.0%')(p) : '<1%')
const formatSI = n => (Number(n) > 10 ? format('.2s')(n) : formatNumber(n))

class NibrsTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showCounts: true }
    this.showCounts = ::this.showCounts
    this.showPercents = ::this.showPercents
  }

  showCounts(e) {
    e.preventDefault()
    this.setState({ showCounts: true })
  }

  showPercents(e) {
    e.preventDefault()
    this.setState({ showCounts: false })
  }

  render() {
    const { data, rowLim, title } = this.props
    const { showCounts } = this.state
    const btnClass = 'ml-tiny border border-blue rounded'

    const agg = (a, b) => a + b.count
    const total = data.reduce(agg, 0)

    let dataMunged = [...data]
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
        <table className='my2 table-fixed'>
          <caption className='left-align'>
            <div className='bold'>{title}</div>
            <div className='mt-tiny'>
              <span className='bold caps fs-12 red'>Total Incidents</span>
              <span className='bold fs-14 ml1 monospace'>{formatNumber(total)}</span>
            </div>
          </caption>
          <thead className='v-hide'>
            <tr style={{ lineHeight: '16px' }}>
              <th style={{ width: '15%' }} />
              <th style={{ width: '20%' }}>{showCounts ? 'Count' : 'Percent'}</th>
              <th style={{ width: '65%' }}>{title}</th>
            </tr>
          </thead>
          <tbody>
            {dataFormatted.map((d, i) => (
              <tr key={i} className='fs-14'>
                <td className='border-right border-gray'>
                  <div className='progress-bar my1'>
                    <span className='rtl' style={{ width: `${d.percent * 100}%` }} />
                  </div>
                </td>
                <td className='pr-tiny bold monospace right-align'>
                  {showCounts ? d.countFmt : d.percentFmt}
                </td>
                <td className='px1' title={d.key}>{d.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='clearfix'>
          <div className='right mt-tiny fs-10 italic serif'>
            View by
            <button
              className={`${btnClass} ${showCounts ? 'bg-blue white' : 'bg-white'}`}
              onClick={this.showCounts}
            >
              #
            </button>
            <button
              className={`${btnClass} ${!showCounts ? 'bg-blue white' : 'bg-white'}`}
              onClick={this.showPercents}
            >
              %
            </button>
          </div>
          <DownloadDataBtn
            data={data.map(d => ({ key: d.key, count: d.count }))}
            fname={title}
            text='Download data'
          />
        </div>
      </div>
    )
  }
}

NibrsTable.defaultProps = {
  rowLim: 12,
}

export default NibrsTable
