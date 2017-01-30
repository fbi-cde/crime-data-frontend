import React from 'react'

import CrimeTypeFilter from './CrimeTypeFilter'
import LocationFilter from './LocationFilter'
import TimePeriodFilter from './TimePeriodFilter'
import { updateFilters, updateFiltersAndUrl } from '../actions/filterActions'
import { fetchNibrsDimensions } from '../actions/nibrsActions'
import { fetchSummaries } from '../actions/summaryActions'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = ::this.handleChange
  }

  componentDidMount() {
    const { dispatch } = this.props
    const filters = {
      ...this.props.filters,
      ...this.props.router.params,
      ...this.props.router.location.query,
    }

    dispatch(updateFilters(filters))
    dispatch(fetchNibrsDimensions(filters))

    if (filters.crime) dispatch(fetchSummaries(filters))
  }

  handleChange(change) {
    const { location } = this.props.router
    const action = updateFiltersAndUrl({ change, location })
    this.props.dispatch(action)
  }

  render() {
    const { crime, place } = this.props.router.params
    const { filters } = this.props

    return (
      <nav className='site-sidebar bg-white'>
        <div className='p6 sm-p3 md-p4'>
          <LocationFilter
            onChange={this.handleChange}
            selected={place}
          />
          <TimePeriodFilter
            timeFrom={filters.timeFrom}
            timeTo={filters.timeTo}
            onChange={this.handleChange}
          />
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
