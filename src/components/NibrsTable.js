import { format } from 'd3-format'
import React from 'react'


const formatPercent = format('.0%')
const formatNumber = format(',')

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
    const dataParsed = data.map(d => ({ ...d, percent: (d.count / total) }))

    const btnCls = 'ml-tiny border border-blue rounded'
    const activeBtnCls = 'bg-blue white'
    const inactiveBtnCls = 'bg-white'

    dataParsed.sort((a, b) => b.count - a.count)

    return (
      <div>
        <table className='mb2 pb2 border-bottom table-fixed'>
          <caption className='left-align'>
            <div className='bold'>{title}</div>
            <div>
              <span className='bold caps fs4 red'>Total Incidents</span>
              <span className='bold fs3 ml1 monospace'>
                {formatNumber(total)}
              </span>
            </div>
          </caption>
          <thead className='v-hide'>
            <tr>
              <th style={{ width: '24%' }} />
              <th style={{ width: '24%' }}>
                {showCounts ? 'Count' : 'Percent'}
              </th>
              <th style={{ width: '52%' }}>{title}</th>
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
                <td className='bold monospace right-align'>
                  {
                    /* eslint no-nested-ternary: 0 */
                    showCounts ? formatNumber(d.count) :
                    (d.percent > 0.01) ? formatPercent(d.percent) : '<1%'
                  }
                </td>
                <td className='px1 line-height-3' title={d.key}>{d.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='italic serif fs5 right-align'>
          View by
          <button
            className={
              `${btnCls} ${showCounts ? activeBtnCls : inactiveBtnCls}`
            }
            onClick={this.showCounts}
          >
            #
          </button>
          <button
            className={
              `${btnCls} ${!showCounts ? activeBtnCls : inactiveBtnCls}`
            }
            onClick={this.showPercents}
          >
            %
          </button>
        </div>
      </div>
    )
  }
}

export default IncidentDetailTable
