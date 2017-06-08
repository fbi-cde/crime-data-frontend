import React from 'react'

import AboutTheData from './AboutTheData'
import AgencyChartContainer from './AgencyChartContainer'
import ExplorerHeaderContainer from './ExplorerHeaderContainer'

import NibrsContainer from './NibrsContainer'
import NotFound from './NotFound'
import SidebarContainer from './SidebarContainer'
import SparklineContainer from './SparklineContainer'
import TrendContainer from './TrendContainer'

import { updateApp } from '../actions/composite'
import { showTerm } from '../actions/glossary'
import { hideSidebar, showSidebar } from '../actions/sidebar'
import offenses from '../util/offenses'
import { getPlaceInfo } from '../util/place'

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
      ...query,
      since: clean(query.since, since),
      until: clean(query.until, until),
    }

    dispatch(updateApp(filters))
  }

  componentWillReceiveProps(newProps) {
    const { appState, dispatch } = this.props
    const { place } = appState.filters
    const newPlace = getPlaceInfo(newProps.params)

    if (place !== newPlace.place) {
      dispatch(updateApp({ ...newPlace }))
    }
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
    const { dispatch, params } = this.props
    const { crime } = params
    const { place, placeType } = getPlaceInfo(params)
    const isAgency = placeType === 'agency'

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(crime) || !lookup(place, placeType)) {
      return <NotFound />
    }

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
        <SidebarContainer onChange={this.handleSidebarChange} />
        <div className="site-content">
          <div className="container-main mx-auto px2 md-py3 lg-px8">
            <ExplorerHeaderContainer />
            {isAgency && <SparklineContainer />}
            {isAgency ? <AgencyChartContainer /> : <TrendContainer />}
            <NibrsContainer />
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
