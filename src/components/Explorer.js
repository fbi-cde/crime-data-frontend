import React from 'react'

import AboutTheData from './AboutTheData'
import AgencyChartContainer from './AgencyChartContainer'
import ExplorerHeader from './ExplorerHeader'
import NibrsContainer from './NibrsContainer'
import NotFound from './NotFound'
import SidebarContainer from './SidebarContainer'
import SparklineContainer from './SparklineContainer'
import TrendContainer from './TrendContainer'
import UcrParticipationContainer from './UcrParticipationContainer'
import { updateApp } from '../actions/composite'
import { showTerm } from '../actions/glossary'
import { hideSidebar, showSidebar } from '../actions/sidebar'
import offenses from '../util/offenses'
import { oriToState } from '../util/ori'
import { getPlaceInfo } from '../util/place'
import ucrParticipation from '../util/ucr'
import lookup from '../util/usa'

class Explorer extends React.Component {
  componentDidMount() {
    const { appState, dispatch, router } = this.props
    const { since, until } = appState.filters
    const { query } = router.location
    const { place, placeType } = getPlaceInfo(appState.filters)

    const clean = (val, alt) => {
      const yr = +val
      return yr >= 1960 && yr <= 2014 ? yr : alt
    }

    const filters = {
      place,
      placeType,
      ...this.props.filters,
      ...router.params,
      since: clean(query.since, since),
      until: clean(query.until, until),
    }

    dispatch(updateApp(filters))
  }

  handleSidebarChange = change => {
    const { router } = this.props
    this.props.dispatch(updateApp(change, router))
  }

  toggleSidebar = () => {
    const { dispatch } = this.props
    const { isOpen } = this.props.appState.sidebar

    if (isOpen) return dispatch(hideSidebar())
    return dispatch(showSidebar())
  }

  render() {
    const { appState, dispatch, params, router } = this.props
    const { crime } = params
    const { place, placeType } = getPlaceInfo(params)

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(crime) || !lookup(place, placeType)) {
      return <NotFound />
    }

    const { agencies } = appState
    const noNibrs = ['violent-crime', 'property-crime']
    const placeNorm = placeType === 'agency' ? oriToState(place) : place
    const participation = ucrParticipation(placeNorm)
    const showNibrs = !noNibrs.includes(crime) && participation.nibrs
    const isAgency = placeType === 'agency'

    return (
      <div className="site-wrapper">
        <div className="sticky top-0">
          <div className="inline-block p1 bg-red-bright rounded-br md-hide lg-hide">
            <button
              className="btn p1 line-height-1 border-none"
              onClick={this.toggleSidebar}
            >
              <img
                className="align-middle"
                width="22"
                height="20"
                src="/img/filters.svg"
                alt="filters"
              />
            </button>
          </div>
        </div>
        <SidebarContainer onChange={this.handleSidebarChange} router={router} />
        <div className="site-content">
          <div className="container-main mx-auto px2 md-py3 lg-px8">
            <ExplorerHeader
              agencies={agencies}
              crime={crime}
              place={place}
              placeType={placeType}
            />
            <UcrParticipationContainer />
            {isAgency && <SparklineContainer />}
            {isAgency ? <AgencyChartContainer /> : <TrendContainer />}
            {showNibrs && <NibrsContainer />}
            <hr className="mt0 mb3" />
            <AboutTheData
              crime={crime}
              onTermClick={term => dispatch(showTerm(term))}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Explorer
