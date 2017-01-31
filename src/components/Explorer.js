import lowerCase from 'lodash.lowercase'
import { plural } from 'pluralize'
import React from 'react'
import startCase from 'lodash.startcase'

import AboutTheData from './AboutTheData'
import Breadcrumbs from './Breadcrumbs'
import NotFound from './NotFound'
import NibrsDimensionsContainer from './NibrsDimensionsContainer'
import Sidebar from './Sidebar'
import Term from './Term'
import TrendContainer from './TrendContainer'

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

const Explorer = ({ appState, dispatch, params, router }) => {
  const crime = lowerCase(params.crime)
  const { filters, nibrs, summaries } = appState
  const place = startCase(params.place)

  // show not found page if crime or place unfamiliar
  if (!crimeSlugs.includes(crime) || !lookup(place)) return <NotFound />

  const nibrsData = filterNibrsData(nibrs.data, filters)
  const trendData = mungeSummaryData(summaries, params.place)

  return (
    <div className='site-wrapper'>
      <Sidebar
        dispatch={dispatch}
        filters={filters}
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
            <h2 className='m0 fs-ch1 sans-serif'>
              Reported {plural(crime)} in {place},
              <br />
              {filters.timeFrom}–{filters.timeTo}
            </h2>
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

Explorer.defaultProps = {
  params: { crime: 'murder', place: 'ohio' },
}

export default Explorer
