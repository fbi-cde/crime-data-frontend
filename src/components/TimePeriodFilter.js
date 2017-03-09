import range from 'lodash.range'
import React from 'react'

const MIN_YEAR = 1960
const MAX_YEAR = 2014
const YEAR_RANGE = range(MIN_YEAR, MAX_YEAR + 1)

class TimePeriodFilter extends React.Component {
  state = { error: null }

  setError = msg => {
    this.setState({ error: msg })
  }

  handleChange = e => {
    const { id, value } = e.target
    const filters = { ...this.props, [id]: +value }
    const { since, until } = filters

    if (since > until) {
      return this.setError('The beginning year must be earlier than the end year')
    } else if (Math.abs(until - since) < 10) {
      return this.setError('You must select a range of at least 10 years')
    }

    this.setState({ error: null })
    return this.props.onChange({ since, until })
  }

  render() {
    const { error } = this.state
    const { since, until } = this.props

    return (
      <div id='time-period' className='mb5'>
        <div className='mb3 fs-22 bold border-bottom'>Time period</div>
        <div className='clearfix'>
          <div className='col col-5'>
            <label htmlFor='since' className='hide'>Time from</label>
            <select
              className='col-12 field field-sm select'
              id='since'
              onChange={this.handleChange}
              value={since}
            >
              {YEAR_RANGE.map((y, i) => <option key={i}>{y}</option>)}
            </select>
          </div>
          <span className='col col-2 fs-18 lh-32 center'>to</span>
          <div className='col col-5'>
            <label htmlFor='until' className='hide'>Time to</label>
            <select
              className='col-12 field field-sm select'
              id='until'
              onChange={this.handleChange}
              value={until}
            >
              {YEAR_RANGE.map((y, i) => <option key={i}>{y}</option>)}
            </select>
          </div>
        </div>
        {error && <p className='my1 fs-10 red-bright'>{error}</p>}
      </div>
    )
  }
}

TimePeriodFilter.propTypes = {
  since: React.PropTypes.number.isRequired,
  until: React.PropTypes.number.isRequired,
}

export default TimePeriodFilter
