import React from 'react'

const MIN_YEAR = 1960
const MAX_YEAR = 2014
const YEAR_WINDOW = 10

class TimePeriodFilter extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
    this.setError = ::this.setError
    this.state = {
      error: null,
      timeFrom: this.props.timeFrom,
      timeTo: this.props.timeTo,
    }
  }

  handleChange(e) {
    const { state } = this
    const { id, value } = e.target
    const isFrom = id === 'timeFrom'
    const other = (isFrom) ? state.timeTo : state.timeFrom

    if (isFrom && value < 1960) {
      return this.setError('Please select a beginning year since 1960')
    } else if (isFrom && value > other) {
      return this.setError('The beginning year must be earlier than the end year')
    } else if (!isFrom && value > 2014) {
      return this.setError('Please select an end year that is earlier than 2014')
    } else if (Math.abs(other - value) < 10) {
      return this.setError('You must select a range of at least 10 years')
    }

    this.setState({ [id]: value, error: null })

    return this.props.onChange({
      timeFrom: (isFrom) ? value : state.timeFrom,
      timeTo: (isFrom) ? state.timeTo : value,
    })
  }

  setError(msg) {
    this.setState({ error: msg })
  }

  render() {
    const { error } = this.state

    return (
      <div id='time-period' className='mb5'>
        <h3 className='fs1 sans-serif mt0 mb4 pb-tiny border-bottom'>
          Time period
        </h3>
        <div className='clearfix'>
          {error && (
            <p className='m0 mb1 h5 red'>{error}</p>
          )}
          <div className='col col-5'>
            <label htmlFor='time-from' className='hide'>Time from</label>
            <input
              className='block field right-align m0'
              type='number'
              id='timeFrom'
              min={MIN_YEAR}
              max={MAX_YEAR}
              onChange={this.handleChange}
              value={this.state.timeFrom}
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
              value={this.state.timeTo}
            />
          </div>
        </div>
        <p className='italic fs4 m0 mt2 serif'>Summary data available from 1961–2015</p>
        <p className='italic fs4 m0 serif'>Incident data available from 1996–2015</p>
      </div>
    )
  }
}

export default TimePeriodFilter
