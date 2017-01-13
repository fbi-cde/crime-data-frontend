import React from 'react'

class TimePeriodFilter extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
    this.state = {
      error: null,
      minYear: 1960,
      maxYear: 2015,
      yearRange: 10,
    }
  }

  handleChange(e) {
    const { id, value } = e.target

    const isFrom = id === 'timeFrom'
    // const otherId = isFrom ? 'timeTo' : 'timeFrom'
    // const otherVal = +value + (yearRange * (isFrom ? 1 : -1))

    const fromValue = (isFrom) ? +value : this.props.timeFrom
    const toValue = (isFrom) ? this.props.timeTo : +value
    const withinRange = this.periodWithinRange(fromValue, toValue)

    if (!withinRange) {
      return this.setState({ error: true })
    }

    this.props.onChange({
      [id]: value,
      // [otherId]: String(otherVal),
    })

    return this.setState({ error: null })
  }

  periodWithinRange(timeFrom, timeTo) {
    const { minYear, maxYear, yearRange } = this.state

    if (timeFrom < minYear) return false
    else if (timeTo > maxYear) return false
    else if ((timeTo - timeFrom) < yearRange) return false
    return true
  }

  render() {
    const { minYear, maxYear } = this.state
    return (
      <div id='time-period' className='mb4'>
        <h3 className='mt0 mb2 pb-tiny border-bottom'>Time period</h3>
        {this.state.error && (
          <p className='red h5'>
            You must select a period of at least 10 years.
          </p>
        )}
        <div className='clearfix'>
          <div className='col col-5'>
            <label htmlFor='time-from' className='hide'>Time from</label>
            <input
              className='block col-12 field'
              type='number'
              id='timeFrom'
              min={minYear}
              max={maxYear}
              onChange={this.handleChange}
              value={this.props.timeFrom}
            />
          </div>
          <span className='col col-2 center lh-form-field'>to</span>
          <div className='col col-5'>
            <label htmlFor='time-to' className='hide'>Time to</label>
            <input
              className='block col-12 field'
              type='number'
              id='timeTo'
              min={minYear}
              max={maxYear}
              onChange={this.handleChange}
              value={this.props.timeTo}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TimePeriodFilter
