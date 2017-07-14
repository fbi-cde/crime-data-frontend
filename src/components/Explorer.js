import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import AboutTheData from './AboutTheData'
import AgencyChartContainer from '../containers/AgencyChartContainer'
import ExplorerHeaderContainer from '../containers/ExplorerHeaderContainer'
import NibrsContainer from '../containers/NibrsContainer'
import NotFound from './NotFound'
import SharingTags from './SharingTags'
import SidebarContainer from '../containers/SidebarContainer'
import SparklineContainer from '../containers/SparklineContainer'
import TrendContainer from '../containers/TrendContainer'

import { updateApp } from '../actions/composite'
import { showTerm } from '../actions/glossary'
import { hideSidebar, showSidebar } from '../actions/sidebar'
import offenses from '../util/offenses'
import { getAgency } from '../util/ori'
import { getPlaceInfo } from '../util/place'

import lookup from '../util/usa'

class Explorer extends React.Component {
  componentDidMount() {
    const { appState, dispatch, params, router } = this.props
    const { since, until } = appState.filters
    const { query } = router.location
    const { place, placeType } = getPlaceInfo(params)

    const clean = (val, alt) => {
      const yr = +val
      return yr >= 1960 && yr <= 2014 ? yr : alt
    }

    const filters = {
      ...params,
      place,
      placeType,
      ...query,
      since: clean(query.since, since),
      until: clean(query.until, until),
    }

    dispatch(updateApp(filters))
  }

  componentWillReceiveProps({ params: newParams }) {
    const { appState, dispatch } = this.props
    const { place } = appState.filters
    const { crime } = newParams
    const newPlace = getPlaceInfo(newParams)

    if (place !== newPlace.place) {
      dispatch(updateApp({ crime, ...newPlace }))
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
    const { appState, dispatch, params } = this.props
    const { agencies, filters } = appState
    const { crime } = params
    const { place, placeType } = getPlaceInfo(params)
    const agency = placeType === 'agency' && getAgency(agencies, place)
    const placeDisplay = agency ? agency.agency_name : startCase(place)

    // ensure app state place matches url params place
    if (filters.place && filters.place !== place) return null

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(crime) || !lookup(place, placeType)) {
      return <NotFound />
    }

    return (
      <div className="site-wrapper">
        <Helmet title="CDE :: Explorer" />
        <SharingTags
          title={`${startCase(crime)} reported ${placeType === 'agency'
            ? 'by the'
            : 'in'} ${placeDisplay}`}
        />
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
        <SidebarContainer
          ariaControls="explorer"
          onChange={this.handleSidebarChange}
        />
        <div className="site-content" id="explorer">
          <div className="container-main mx-auto px2 md-py3 lg-px3">
            <ExplorerHeaderContainer />
            {agency && <SparklineContainer />}
            {agency ? <AgencyChartContainer /> : <TrendContainer />}
            <NibrsContainer />
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

Explorer.propTypes = {
  appState: PropTypes.object,
  dispatch: PropTypes.func,
  params: PropTypes.object,
  router: PropTypes.object,
}

export default Explorer
