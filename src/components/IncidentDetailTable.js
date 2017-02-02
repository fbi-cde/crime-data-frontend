import { format } from 'd3-format'
import React from 'react'

// TODO: refactor SORT_DETAILS and sortIdx

const SORT_DETAILS = [
  { key: 'count', order: 'desc' },
  { key: 'count', order: 'asc' },
]

const formatPercent = format('.0%')
const formatNumber = format(',')

class IncidentDetailTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sortIdx: 0 }
    this.changeSort = ::this.changeSort
  }

  changeSort(e) {
    e.preventDefault()
    this.setState({ sortIdx: ((this.state.sortIdx + 1) % 2) })
  }

  render() {
    const { data, title } = this.props
    const { sortIdx } = this.state

    const total = data.reduce((a, b) => (a + b.count), 0)
    const dataParsed = data.map(d => ({ ...d, percent: (d.count / total) }))
    const sort = SORT_DETAILS[sortIdx]

    dataParsed.sort((a, b) => a[sort.key] - b[sort.key])
    if (sort.order === 'desc') dataParsed.reverse()

    return (
      <table className='mb2 pb2 border-bottom table-fixed'>
        <caption className='bold left-align'>{title}</caption>
        <thead>
          <tr>
            <th className='v-hide' style={{ width: '14%' }} />
            <th className='v-hide' style={{ width: '10%' }}>Percent</th>
            <th className='v-hide' style={{ width: '52%' }}>{title}</th>
            <th className='h5 right-align' style={{ width: '24%' }}>
              <button type='button' className='btn p0 red' onClick={this.changeSort}>
                Incidents
              </button>
            </th>
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
                {(d.percent > 0.01) ? formatPercent(d.percent) : '<1%'}
              </td>
              <td className='px1 line-height-3' title={d.key}>{d.key}</td>
              <td className='monospace right-align'>
                {formatNumber(d.count)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default IncidentDetailTable
