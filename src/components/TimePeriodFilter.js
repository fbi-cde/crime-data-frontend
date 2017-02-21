import range from 'lodash.range'
import React from 'react'

const MIN_YEAR = 1960
const MAX_YEAR = 2014
const YEAR_RANGE = range(MIN_YEAR, MAX_YEAR + 1)

class TimePeriodFilter extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
    this.setError = ::this.setError
    this.state = { error: null }
  }

  setError(msg) {
    this.setState({ error: msg })
  }

  handleChange(e) {
    const { props } = this
    const { id, value } = e.target
    const isFrom = id === 'timeFrom'
    const other = (isFrom) ? props.timeTo : props.timeFrom

    if (isFrom && value > other) {
      return this.setError('The beginning year must be earlier than the end year')
    } else if (Math.abs(other - value) < 10) {
      return this.setError('You must select a range of at least 10 years')
    }

    this.setState({ error: null })

    return props.onChange({
      timeFrom: (isFrom) ? value : props.timeFrom,
      timeTo: (isFrom) ? props.timeTo : value,
    })
  }

  render() {
    const { error } = this.state
    const { timeFrom, timeTo } = this.props

    return (
      <div id='time-period' className='mb5'>
        <div className='mb4 fs-22 bold border-bottom'>Time period</div>
        <div className='clearfix'>
          <div className='col col-5'>
            <label htmlFor='timeFrom' className='hide'>Time from</label>
            <select
              className='col-12 field field-sm select'
              id='timeFrom'
              onChange={this.handleChange}
              value={timeFrom}
            >
              {YEAR_RANGE.map((y, i) => <option key={i}>{y}</option>)}
            </select>
          </div>
          <span className='col col-2 fs-18 lh-32 center'>to</span>
          <div className='col col-5'>
            <label htmlFor='timeTo' className='hide'>Time to</label>
            <select
              className='col-12 field field-sm select'
              id='timeTo'
              onChange={this.handleChange}
              value={timeTo}
            >
              {YEAR_RANGE.map((y, i) => <option key={i}>{y}</option>)}
            </select>
          </div>
        </div>
        {error && <p className='my1 fs-10 red-bright'>{error}</p>}
        {/*
        <p className={`italic fs-12 m0 serif ${!error && 'mt2'}`}>
          Summary data available from 1961–2015<br />
          Incident data available from 1996–2015
        </p>
        */}
      </div>
    )
  }
}

export default TimePeriodFilter
