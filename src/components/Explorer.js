import startCase from 'lodash.startcase'
import React from 'react'

import AboutTheData from './AboutTheData'
import NibrsContainer from './NibrsContainer'
import NotFound from './NotFound'
import Sidebar from './Sidebar'
import TrendContainer from './TrendContainer'
import UcrParticipationInformation from './UcrParticipationInformation'

import { hideSidebar, showSidebar } from '../actions/sidebar'
import { updateApp } from '../actions/composite'
import lookup from '../util/usa'
import offenses from '../util/offenses'
import ucrParticipation from '../util/ucr'

const filterNibrsData = (data, { since, until }) => {
  if (!data) return false
  const filtered = {}
  Object.keys(data).forEach(key => {
    filtered[key] = data[key].filter(d => {
      const year = parseInt(d.year, 10)
      return year >= since && year <= until
    })
  })

  return filtered
}

const dataByYear = data => (
  Object.assign(
    ...Object.keys(data).map(k => ({
      [k]: Object.assign(...data[k].map(d => ({ [d.year]: d }))),
    })),
  )
)

const mungeSummaryData = (summaries, ucr, place) => {
  if (!summaries || !summaries[place]) return false

  const keys = Object.keys(summaries)
  const summaryByYear = dataByYear(summaries)
  const ucrByYear = dataByYear(ucr)

  return summaries[place].map(d => (
    Object.assign(
      { date: d.year },
      ...keys.map(k => {
        const count = summaryByYear[k][d.year].actual
        const pop = ucrByYear[k][d.year].total_population
        return { [k]: { count, pop, rate: (count / pop) * 100000 } }
      }),
    )
  ))
}

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.handleSidebarChange = ::this.handleSidebarChange
    this.toggleSidebar = ::this.toggleSidebar

    this.state = {
      sidebarHasOpened: false,
    }
  }

  componentDidMount() {
    const { appState, dispatch, router } = this.props
    const { since, until } = appState.filters
    const { query } = router.location

    const clean = (val, alt) => {
      const yr = +val
      return yr >= 1960 && yr <= 2014 ? yr : alt
    }

    const filters = {
      ...this.props.filters,
      ...router.params,
      since: clean(query.since, since),
      until: clean(query.until, until),
    }

    dispatch(updateApp(filters))
  }

  handleSidebarChange(change) {
    const { location } = this.props.router
    this.props.dispatch(updateApp(change, location))
  }

  toggleSidebar() {
    const { dispatch } = this.props
    const { isOpen } = this.props.appState.sidebar

    this.setState({ sidebarHasOpened: true })

    if (isOpen) return dispatch(hideSidebar())
    return dispatch(showSidebar())
  }

  render() {
    const { appState, dispatch, params, router } = this.props
    const { sidebarHasOpened } = this.state
    const { crime, place } = params

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(crime) || !lookup(place)) return <NotFound />

    const { filters, nibrs, sidebar, summaries, ucr } = appState
    const nibrsData = filterNibrsData(nibrs.data, filters)
    const noNibrs = ['violent-crime', 'property-crime']
    const participation = ucrParticipation(place)
    const showNibrs = (!noNibrs.includes(crime) && participation.nibrs)
    const trendData = mungeSummaryData(summaries.data, ucr.data, place)
    const trendKeys = Object.keys(summaries.data).map(k => startCase(k))

    return (
      <div className='site-wrapper'>
        <div style={{ position: 'sticky', top: 0 }}>
          <div className='inline-block p1 bg-red-bright md-hide lg-hide'>
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
          hasOpened={sidebarHasOpened}
          isOpen={sidebar.isOpen}
          onChange={this.handleSidebarChange}
          router={router}
        />
        <div className='site-content'>
          <div className='container-main mx-auto px3 md-p3'>
            <div className='items-baseline my4 border-bottom border-blue-lighter'>
              <h1 className='flex-auto mt0 mb1 fs-22 sm-fs-32'>
                {startCase(place)}, {startCase(crime)}
              </h1>
            </div>
            <UcrParticipationInformation
              dispatch={dispatch}
              place={params.place}
              until={filters.until}
              ucr={ucr}
            />
            <hr className='mt0 mb3' />
            <TrendContainer
              crime={crime}
              place={place}
              filters={filters}
              data={trendData}
              dispatch={dispatch}
              loading={summaries.loading}
              keys={trendKeys}
            />
            {showNibrs && (<NibrsContainer
              crime={params.crime}
              data={nibrsData}
              dispatch={dispatch}
              error={nibrs.error}
              filters={filters}
              loading={nibrs.loading}
              place={params.place}
            />)}
            <hr className='mt0 mb3' />
            <AboutTheData crime={crime} place={place} />
          </div>
        </div>
      </div>
    )
  }
}

Explorer.defaultProps = {
  params: { crime: 'murder', place: 'ohio' },
}

export default Explorer
