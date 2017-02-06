import throttle from 'lodash.throttle'
import React from 'react'

import CrimeTypeFilter from './CrimeTypeFilter'
import LocationFilter from './LocationFilter'
import TimePeriodFilter from './TimePeriodFilter'

import { hideSidebar } from '../actions/sidebarActions'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { y: null }
    this.getDimensions = throttle(::this.getDimensions, 20)
  }

  componentDidMount() {
    this.getDimensions()
    window.addEventListener('scroll', this.getDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getDimensions)
  }

  getDimensions() {
    this.setState({ y: window.pageYOffset })
  }

  render() {
    const { dispatch, filters, isOpen, onChange, router } = this.props
    const { y } = this.state

    const { crime, place } = router.params
    const hide = () => dispatch(hideSidebar())
    const affixCutoff = 156 // 28 (beta banner height) + 128 (header height)

    return (
      <nav className={`site-sidebar ${isOpen ? 'open' : ''}`}>
        <div className={`bg-white ${y >= affixCutoff ? 'affix' : ''}`}>
          <div className='p2 bg-red-bright line-height-1 md-hide lg-hide'>
            <button
              type='button'
              className='right btn p0 h5 caps line-height-3 black'
              onClick={hide}
            >
              Close
            </button>
            <img
              className='align-middle'
              width='22'
              height='20'
              src='/img/filters.svg'
              alt='filters'
            />
          </div>
          <div className='p6 sm-p3 md-p4'>
            <LocationFilter
              onChange={onChange}
              selected={place}
            />
            <TimePeriodFilter
              timeFrom={filters.timeFrom}
              timeTo={filters.timeTo}
              onChange={onChange}
            />
            <CrimeTypeFilter
              onChange={onChange}
              selected={crime}
            />
          </div>
        </div>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  onChange: React.PropTypes.func,
}

export default Sidebar
