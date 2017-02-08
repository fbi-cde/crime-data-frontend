import lowerCase from 'lodash.lowercase'
import React from 'react'
import startCase from 'lodash.startcase'

import AboutTheData from './AboutTheData'
import Breadcrumbs from './Breadcrumbs'
import NotFound from './NotFound'
import NibrsContainer from './NibrsContainer'
import Sidebar from './Sidebar'
import Term from './Term'
import TrendContainer from './TrendContainer'

import { fetchSummaries } from '../actions/summaryActions'
import { fetchNibrsDimensions } from '../actions/nibrsActions'
import { updateFilters, updateFiltersAndUrl } from '../actions/filterActions'
import { hideSidebar, showSidebar } from '../actions/sidebarActions'

import content from '../util/content'
import offenses from '../util/offenses'
import mapGlossaryTerms from '../util/glossary'
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
  if (Object.keys(summaries).length === 1 || !summaries[place]) return false
  return summaries[place].map((s, i) => ({
    date: s.year,
    national: summaries.national[i].rate,
    [place]: s.rate,
  }))
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

    // show not found page if crime or place unfamiliar
    if (!offenses.includes(params.crime) || !lookup(params.place)) {
      return <NotFound />
    }

    const links = content.states[params.place]
    const { filters, nibrs, sidebar, summaries } = appState
    const nibrsData = filterNibrsData(nibrs.data, filters)
    const trendData = mungeSummaryData(summaries, params.place)

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
              <h1 className='flex-auto mt0 mb1'>
                {startCase(params.crime)}, {filters.timeFrom}-{filters.timeTo}
              </h1>
            </div>
            <p className='mb5 fs1 serif'>
              Incidents of
              <Term
                dispatch={dispatch}
                id={mapGlossaryTerms(params.crime) || 'undefinedTerm'}
              >
                {lowerCase(params.crime)}
              </Term>
              are on the rise in {lowerCase(params.crime)}, but lower than 5
              or 10 years ago. {startCase(params.place)}&#39;s
              {lowerCase(params.crime)} rate surpassed that of the U.S. in
              1985, and peaked in 1991, with a rate of over 52 incidents
              per 100,000 people.<sup>1</sup>
            </p>
            <hr className='mt0 mb3' />
            <TrendContainer
              crime={params.crime}
              place={params.place}
              filters={filters}
              data={trendData}
              loading={summaries.loading}
              keys={['National', startCase(params.place)]}
            />
            <NibrsContainer
              crime={params.crime}
              place={params.place}
              filters={filters}
              data={nibrsData}
              loading={nibrs.loading}
            />
            <hr className='mt0 mb3' />
            <AboutTheData crime={params.crime} place={params.place} />
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
