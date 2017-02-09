import startCase from 'lodash.startcase'
import React from 'react'

import AboutTheData from './AboutTheData'
import Breadcrumbs from './Breadcrumbs'
import NotFound from './NotFound'
import NibrsContainer from './NibrsContainer'
import Sidebar from './Sidebar'
import TrendContainer from './TrendContainer'

import UcrParticipationInformation from './UcrParticipationInformation'

import { fetchSummaries } from '../actions/summaryActions'
import { fetchNibrsDimensions } from '../actions/nibrsActions'
import { fetchUcrParticipation } from '../actions/ucrActions'
import { updateFilters, updateFiltersAndUrl } from '../actions/filterActions'
import { hideSidebar, showSidebar } from '../actions/sidebarActions'

import offenses from '../util/offenses'

import lookup from '../util/usa'

const filterNibrsData = (data, { timeFrom, timeTo }) => {
  if (!data) return false
  const filtered = {}
  Object.keys(data).forEach(key => {
    filtered[key] = data[key].filter(d => {
      const year = parseInt(d.year, 10)
      return year >= timeFrom && year <= timeTo
    })
  })

  return filtered
}

const mungeSummaryData = (summaries, place) => {
  if (!summaries || !summaries[place]) return false

  const keys = Object.keys(summaries)
  return summaries[place].map((s, i) => (
    Object.assign(
      { date: s.year },
      ...keys.map(k => ({ [k]: summaries[k][i].rate })),
    )
  ))
}

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.handleSidebarChange = ::this.handleSidebarChange
    this.toggleSidebar = ::this.toggleSidebar
  }

  componentDidMount() {
    const { appState, dispatch } = this.props
    const filters = {
      ...this.props.filters,
      ...this.props.router.params,
      ...this.props.router.location.query,
    }

    const check = value => {
      const year = parseInt(value, 10)
      return year >= 1960 && year <= 2014
    }

    if (!check(filters.timeFrom)) filters.timeFrom = appState.filters.timeFrom
    if (!check(filters.timeTo)) filters.timeTo = appState.filters.timeTo

    dispatch(updateFilters(filters))
    dispatch(fetchUcrParticipation(filters.place))
    if (filters.crime) {
      dispatch(fetchSummaries(filters))
      dispatch(fetchNibrsDimensions(filters))
    }
  }

  handleSidebarChange(change) {
    const { location } = this.props.router
    const action = updateFiltersAndUrl({ change, location })
    this.props.dispatch(action)
  }

  toggleSidebar() {
    const { dispatch } = this.props
    const { isOpen } = this.props.appState.sidebar

    if (isOpen) return dispatch(hideSidebar())
    return dispatch(showSidebar())
  }

  render() {
    const { appState, dispatch, params, router } = this.props
    const { crime, place } = params

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(crime) || !lookup(place)) return <NotFound />

    const { filters, nibrs, sidebar, summaries, ucr } = appState
    const nibrsData = filterNibrsData(nibrs.data, filters)
    const trendData = mungeSummaryData(summaries.data, place)
    const trendKeys = Object.keys(summaries.data).map(k => startCase(k))

    return (
      <div className='site-wrapper'>
        <div className='fixed right-0 top-0 p1'>
          <button
            className='btn btn-primary bg-red-bright p1 md-hide lg-hide'
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
        <Sidebar
          dispatch={dispatch}
          filters={filters}
          isOpen={sidebar.isOpen}
          onChange={this.handleSidebarChange}
          router={router}
        />
        <div className='site-content'>
          <div className='container-main mx-auto p3'>
            <Breadcrumbs {...params} />
            <div className='items-baseline mb4 border-bottom border-blue-lighter'>
              <h1 className='flex-auto mt0 mb1 fs-22 sm-fs-32'>
                {startCase(place)}, {startCase(crime)}
              </h1>
            </div>
            <UcrParticipationInformation
              dispatch={dispatch}
              place={params.place}
              timeTo={filters.timeTo}
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
            {ucr.nibrs && (
              <NibrsContainer
                crime={params.crime}
                place={params.place}
                filters={filters}
                data={nibrsData}
                loading={nibrs.loading}
              />
            )}
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
