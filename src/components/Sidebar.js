import React from 'react'

import CrimeTypeFilter from './CrimeTypeFilter'
import LocationFilter from './LocationFilter'
import TimePeriodFilter from './TimePeriodFilter'
import { updateFilter } from '../actions/filterActions'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
  }

  handleChange(change) {
    const action = updateFilter(change)
    this.props.dispatch(action)
  }

  render() {
    const { crime, state } = this.props.router.params

    return (
      <nav className='site-sidebar bg-white'>
        <div className='p2 sm-p3'>
          <LocationFilter
            onChange={this.handleChange}
            selected={state}
          />
          <TimePeriodFilter onChange={this.handleChange} />
          <CrimeTypeFilter
            onChange={this.handleChange}
            selected={crime}
          />
        </div>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  dispatch: React.PropTypes.func,
}

export default Sidebar
