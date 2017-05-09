import React from 'react'

import AboutTheData from './AboutTheData'
import AgencyChartContainer from './AgencyChartContainer'
import ExplorerHeader from './ExplorerHeader'
import NibrsContainer from './NibrsContainer'
import NotFound from './NotFound'
import Sidebar from './Sidebar'
import Sparklines from './Sparklines'
import TrendContainer from './TrendContainer'
import UcrParticipationInformation from './UcrParticipationInformation'
import { updateApp } from '../actions/composite'
import { showTerm } from '../actions/glossary'
import { hideSidebar, showSidebar } from '../actions/sidebar'
import offenses from '../util/offenses'
import ucrParticipation from '../util/ucr'
import lookup, { nationalKey } from '../util/usa'

const getPlaceInfo = ({ place, placeType }) => ({
  place: place || nationalKey,
  placeType: placeType || 'national',
})

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.handleSidebarChange = ::this.handleSidebarChange
    this.toggleSidebar = ::this.toggleSidebar
  }

  componentDidMount() {
    const { appState, dispatch, router } = this.props
    const { since, until } = appState.filters
    const { query } = router.location
    const { place } = getPlaceInfo(appState.filters)

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
    const { place, placeType } = getPlaceInfo(params)

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(crime) || !lookup(place, placeType)) {
      return <NotFound />
    }

    const { agency, filters, nibrs, sidebar, summaries, ucr } = appState
    const { since, until } = filters
    const noNibrs = ['violent-crime', 'property-crime']
    const participation = ucrParticipation(place)
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
        <Sidebar
          dispatch={dispatch}
          filters={filters}
          isOpen={sidebar.isOpen}
          onChange={this.handleSidebarChange}
          router={router}
        />
        <div className="site-content">
          <div className="container-main mx-auto px2 md-py3 lg-px8">
            <ExplorerHeader
              agency={agency}
              crime={crime}
              place={place}
              placeType={placeType}
            />
            <UcrParticipationInformation
              dispatch={dispatch}
              place={place}
              placeType={placeType}
              until={filters.until}
              ucr={ucr}
            />
            <hr className="mt0 mb3" />
            {isAgency && <Sparklines place={place} summaries={summaries} />}
            {isAgency
              ? <AgencyChartContainer
                  crime={crime}
                  place={place}
                  since={since}
                  summary={summaries}
                  until={until}
                />
              : <TrendContainer
                  crime={crime}
                  dispatch={dispatch}
                  place={place}
                  placeType={placeType}
                  since={since}
                  summaries={summaries}
                  until={until}
                />}
            {showNibrs &&
              <NibrsContainer
                crime={params.crime}
                dispatch={dispatch}
                nibrs={nibrs}
                place={place}
                since={since}
                until={until}
              />}
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
