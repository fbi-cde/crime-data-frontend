import { format } from 'd3-format'
import React from 'react'

import DownloadDataBtn from './DownloadDataBtn'


const formatPercent = format('.0%')
const formatNumber = format(',')
const formatSI = format('.2s')

class IncidentDetailTable extends React.Component {
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
    const { data, title } = this.props
    const { showCounts } = this.state

    const total = data.reduce((a, b) => (a + b.count), 0)
    const dataParsed = data.map(d => {
      const p = d.count / total
      return {
        ...d,
        percent: p,
        countFmt: formatSI(d.count),
        percentFmt: p > 0.01 ? formatPercent(p) : '<1%',
      }
    })

    const btnCls = 'ml-tiny border border-blue rounded'
    const activeBtnCls = 'bg-blue white'
    const inactiveBtnCls = 'bg-white'

    dataParsed.sort((a, b) => b.count - a.count)

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
            {dataParsed.map((d, i) => (
              <tr key={i}>
                <td className='border-right border-gray'>
                  <div className='progress-bar my1'>
                    <span className='rtl' style={{ width: `${d.percent * 100}%` }} />
                  </div>
                </td>
                <td className='pr-tiny bold monospace right-align'>
                  {showCounts ? d.countFmt : d.percentFmt}
                </td>
                <td className='px1 truncate' title={d.key}>{d.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='clearfix'>
          <div className='right mt-tiny fs-10 italic serif'>
            View by
            <button
              className={`${btnCls} ${showCounts ? activeBtnCls : inactiveBtnCls}`}
              onClick={this.showCounts}
            >
              #
            </button>
            <button
              className={`${btnCls} ${!showCounts ? activeBtnCls : inactiveBtnCls}`}
              onClick={this.showPercents}
            >
              %
            </button>
          </div>
          <DownloadDataBtn
            data={dataParsed.map(d => ({ key: d.key, count: d.count }))}
            fname={title}
            text='Download data'
          />
        </div>
      </div>
    )
  }
}

export default IncidentDetailTable
