import lowerCase from 'lodash.lowercase'
import { plural } from 'pluralize'
import React from 'react'
import startCase from 'lodash.startcase'

import AboutTheData from './AboutTheData'
import Breadcrumbs from './Breadcrumbs'
import DownloadDataBtn from './DownloadDataBtn'
import NotFound from './NotFound'
import NibrsDimensionsContainer from './NibrsDimensionsContainer'
import Sidebar from './Sidebar'
import Term from './Term'
import TrendContainer from './TrendContainer'

import { fetchSummaries } from '../actions/summaryActions'
import { fetchNibrsDimensions } from '../actions/nibrsActions'
import { updateFilters, updateFiltersAndUrl } from '../actions/filterActions'
import { showSidebar } from '../actions/sidebarActions'
import { crimeTypes } from '../util/data'
import { slugify } from '../util/text'
import lookup from '../util/usa'

const crimeSlugs = [].concat(...Object.values(crimeTypes)).map(s => slugify(s))
/* crimeIds is for linking the crime text to the <Glossary /> component */
const crimeIds = {
  'aggravated-assault': 'aggravated assault',
  burglary: 'burglary',
  murder: 'murder and nonnegligent homicide',
  rape: 'rape (legacy definition)',
  robbery: 'robbery',
}

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

  render() {
    const { appState, dispatch, params, router } = this.props
    const crime = lowerCase(params.crime)
    const place = startCase(params.place)

    // show not found page if crime or place unfamiliar
    if (!crimeSlugs.includes(crime) || !lookup(place)) return <NotFound />

    const revealSidebar = () => dispatch(showSidebar())
    const { filters, nibrs, sidebar, summaries } = appState
    const nibrsData = filterNibrsData(nibrs.data, filters)
    const trendData = mungeSummaryData(summaries, params.place)

    return (
      <div className='site-wrapper'>
        <div className='fixed right-0 top-0 p1'>
          <button
            className='btn btn-primary bg-red-bright p1 md-hide lg-hide'
            onClick={revealSidebar}
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
            <div className='md-flex items-baseline mb4 border-bottom border-blue-lighter'>
              <h1 className='flex-auto mt0 mb1'>
                {place}, {filters.timeFrom}-{filters.timeTo}
              </h1>
            </div>
            <p className='mb5 fs1 serif'>
              Incidents of
              <Term
                dispatch={dispatch}
                id={crimeIds[params.crime] || 'undefinedTerm'}
              >
                {crime}
              </Term>
              are on the
              rise in {place}, but lower than 5 or 10 years ago.
              {place}&#39;s {crime} rate surpassed that of the U.S. in 1985, and peaked
              in 1991, with a rate of over 52 incidents per 100,000
              people.<sup>1</sup>
            </p>
            <hr className='mt0 mb3' />
            <div className='mb2 p2 sm-p4 bg-blue-lighter'>
              <div className='md-flex items-baseline'>
                <div className='flex-auto'>
                  <div className='inline-block'>
                    <h2 className='m0 fs-ch1 sans-serif'>
                      Reported {plural(crime)} in {place},
                      <br />
                      {filters.timeFrom}–{filters.timeTo}
                    </h2>
                  </div>
                </div>
                <div>
                  <DownloadDataBtn
                    data={trendData}
                    fname='summary data'
                    text='Download data'
                  />
                </div>
              </div>
            </div>
            <div className='mb8'>
              <TrendContainer
                data={trendData}
                loading={summaries.loading}
                keys={['National', place]}
              />
            </div>
            <div className='mb2 p2 sm-p4 bg-blue-lighter'>
              <h2 className='m0 fs-ch1 sans-serif'>
                {startCase(crime)} Incident Details in {place},
                <br />
                {filters.timeFrom}–{filters.timeTo}
              </h2>
            </div>
            <div className='mb8'>
              <NibrsDimensionsContainer
                data={nibrsData}
                loading={nibrs.loading}
              />
            </div>
            <hr className='mt0 mb3' />
            <AboutTheData />
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
