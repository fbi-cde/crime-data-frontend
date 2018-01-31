import PropTypes from 'prop-types'
import React from 'react'
import snakeCase from 'lodash.snakecase'

import NibrsCountPercentToggle from '../nibrs/NibrsCountPercentToggle'
import { formatNum, formatPerc, formatSI } from '../../util/formats'
import NoDataCard from '../NoDataCard'

class TableChart extends React.Component {

  constructor(props) {
    super(props)
    const { data } = props
    this.state = { isCounts: false, key: data.keys[0] }
  }

  showCounts = e => {
    e.preventDefault()
    this.setState({ isCounts: true })
  }

  showPercents = e => {
    e.preventDefault()
    this.setState({ isCounts: false })
  }

  updateKey = keySelected => {
    this.setState({ key: keySelected })
  }

  render() {
    const {
      data,
      year
    } = this.props
    console.log('TableChart Render:', data, year)
    const id = snakeCase(data.ui_text)
    const title = data.ui_text
    const { isCounts } = this.state
    const handleSelectChange = e => this.updateKey(e.target.value)

    // Group Data By Key


    const fitleredDataByYear = data.data.filter(d => d.data_year === year)
    if (fitleredDataByYear.length === 0) {
      return (<NoDataCard noun={data.noun} year={year} />)
    }
    const keys = data.keys

    const dataFormattedByKey = []
    for (let j = 0; j < fitleredDataByYear.length; j++) {
      const d = fitleredDataByYear[j]
      for (let i = 0; i < keys.length; i++) {
        if (d.key === keys[i] && d.key === this.state.key) {
          dataFormattedByKey.push(d);
        }
      }
    }

    const dataFormatted = []

    const agg = (a, b) => a + b.value
    const total = dataFormattedByKey.reduce(agg, 0)
    dataFormattedByKey.sort((a, b) => +b.value - +a.value)

    console.log('dataFormattedByKey:', dataFormattedByKey)
    console.log('State Key:', this.state.key)

    for (let i = 0; i < dataFormattedByKey.length; i++) {
      const d = dataFormattedByKey[i]
        const p = d.value / total
        dataFormatted.push({
          ...d,
          percent: p,
          key: d.key_type,
          countFmt: formatSI(d.value),
          percentFmt: formatPerc(p),
        })
    }


    console.log('dataFormatted:', dataFormatted)
    return (
      <div id={id}>
        <div className="clearfix">
          <div className="left">
            <div className='mb3'>
              <label htmlFor="key-selected" className="hide">
                Year selected
              </label>
              <select
                className="field field-sm select select-dark col-10"
                id="key-selected"
                onChange={handleSelectChange}
                value={this.state.key}
              >
                {keys.map((y, i) =>
                  <option key={i}>
                    {y}
                  </option>,
                )}
              </select>
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
          {title} was reported for{' '}
          <span className="bold red">{formatNum(total)}</span> {title}.
        </div>
      </div>
    )
  }
}

TableChart.propTypes = {
  data: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
}

export default TableChart
