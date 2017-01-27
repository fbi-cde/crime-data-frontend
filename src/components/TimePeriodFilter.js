import React from 'react'

const MIN_YEAR = 1960
const MAX_YEAR = 2014
const YEAR_WINDOW = 10

class TimePeriodFilter extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
    this.state = { error: null }
  }

  handleChange(e) {
    const { id, value } = e.target
    const isFrom = id === 'timeFrom'
    const timeFrom = +value - (isFrom ? 0 : YEAR_WINDOW)
    const timeTo = +value + (isFrom ? YEAR_WINDOW : 0)
    const outOfRange = timeFrom < MIN_YEAR || timeTo > MAX_YEAR

    this.setState({ error: outOfRange })
    if (outOfRange) return

    this.props.onChange({ timeFrom, timeTo })
  }

  render() {
    const { error } = this.state

    return (
      <div id='time-period' className='mb5'>
        <h3 className='fs1 sans-serif mt0 mb4 pb-tiny border-bottom'>
          Time period
        </h3>
        <div className='clearfix'>
          <div className='col col-5'>
            <label htmlFor='time-from' className='hide'>Time from</label>
            <input
              className='block field right-align m0'
              type='number'
              id='timeFrom'
              min={MIN_YEAR}
              max={MAX_YEAR}
              onChange={this.handleChange}
              value={this.props.timeFrom}
            />
          </div>
          <span className='col col-2 center lh-form-field'>to</span>
          <div className='col col-5'>
            <label htmlFor='time-to' className='hide'>Time to</label>
            <input
              className='block field center'
              type='number'
              id='timeTo'
              min={MIN_YEAR}
              max={MAX_YEAR}
              onChange={this.handleChange}
              value={this.props.timeTo}
            />
          </div>
        </div>
        {error && (
          <p className='mt1 h5 orange'>
            Please select a 10 year period between {MIN_YEAR} and {MAX_YEAR}.
          </p>
        )}
        <p className='italic fs4 m0 mt3 serif'>Summary data available from 1961–2015</p>
        <p className='italic fs4 m0 serif'>Incident data available from 1996–2015</p>
      </div>
    )
  }
}

export default TimePeriodFilter
