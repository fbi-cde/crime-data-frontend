import startCase from 'lodash.startcase'
import React from 'react'

import AboutTheData from './AboutTheData'
import NibrsContainer from './NibrsContainer'
import NotFound from './NotFound'
import Sidebar from './Sidebar'
import TrendContainer from './TrendContainer'
import UcrParticipationInformation from './UcrParticipationInformation'
import { updateApp } from '../actions/composite'
import { hideSidebar, showSidebar } from '../actions/sidebar'
import offenses from '../util/offenses'
import ucrParticipation from '../util/ucr'
import lookup, { nationalKey } from '../util/usa'

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.handleSidebarChange = ::this.handleSidebarChange
    this.toggleSidebar = ::this.toggleSidebar
  }

  componentDidMount() {
    const { appState, dispatch, router } = this.props
    const { placeType, since, until } = appState.filters
    const { query } = router.location
    let { place } = appState.filters

    if (!place && !placeType) {
      place = nationalKey
    }

    const clean = (val, alt) => {
      const yr = +val
      return yr >= 1960 && yr <= 2014 ? yr : alt
    }

    const filters = {
      place,
      ...this.props.filters,
      ...router.params,
      since: clean(query.since, since),
      until: clean(query.until, until),
    }

    dispatch(updateApp(filters))
  }

  handleSidebarChange(change) {
    const { router } = this.props
    this.props.dispatch(updateApp(change, router))
  }

  toggleSidebar() {
    const { dispatch } = this.props
    const { isOpen } = this.props.appState.sidebar

    if (isOpen) return dispatch(hideSidebar())
    return dispatch(showSidebar())
  }

  render() {
    const { appState, dispatch, params, router } = this.props
    const { crime } = params
    let { place, placeType } = params

    if (!params.place && !params.placeType) {
      place = nationalKey
      placeType = 'national'
    }

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(crime) || !lookup(place, placeType)) {
      return <NotFound />
    }

    const { filters, nibrs, sidebar, summaries, ucr } = appState
    const noNibrs = ['violent-crime', 'property-crime']
    const participation = ucrParticipation(place)
    const showNibrs = (!noNibrs.includes(crime) && participation.nibrs)

    return (
      <div className='site-wrapper'>
        <div className='sticky top-0'>
          <div className='inline-block p1 bg-red-bright rounded-br md-hide lg-hide'>
            <button
              className='btn p1 line-height-1 border-none'
              onClick={this.toggleSidebar}
            >
              <img
                className='align-middle'
                width='22'
                height='20'
                src='/img/filters.svg'
                alt='filters'
              />
            </button>
          </div>
        </div>
        <Sidebar
          dispatch={dispatch}
          filters={filters}
          isOpen={sidebar.isOpen}
          onChange={this.handleSidebarChange}
          router={router}
        />
        <div className='site-content'>
          <div className='container-main mx-auto px2 md-py3 lg-px8'>
            <div className='items-baseline my4 border-bottom border-blue-lighter'>
              <h1 className='flex-auto mt0 mb1 fs-22 sm-fs-32'>
                {startCase(place)}, {startCase(crime)}
              </h1>
            </div>
            <UcrParticipationInformation
              dispatch={dispatch}
              place={place}
              placeType={placeType}
              until={filters.until}
              ucr={ucr}
            />
            <hr className='mt0 mb3' />
            <TrendContainer
              crime={crime}
              dispatch={dispatch}
              place={place}
              placeType={placeType}
              since={filters.since}
              summaries={summaries}
              ucr={ucr}
              until={filters.until}
            />
            {showNibrs && (<NibrsContainer
              crime={params.crime}
              dispatch={dispatch}
              nibrs={nibrs}
              place={place}
              since={filters.since}
              until={filters.until}
            />)}
            <hr className='mt0 mb3' />
            <AboutTheData crime={crime} place={place} />
          </div>
        </div>
      </div>
    )
  }
}

export default Explorer
