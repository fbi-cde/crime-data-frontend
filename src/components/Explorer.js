import lowerCase from 'lodash.lowercase'
import { plural } from 'pluralize'
import React from 'react'
import startCase from 'lodash.startcase'

import AboutTheData from './AboutTheData'
import Breadcrumbs from './Breadcrumbs'
import IncidentDetailCard from './IncidentDetailCard'
import Sidebar from './Sidebar'
import Term from './Term'
import TimeChart from './TimeChart'

import {
  detailLocationData,
  detailOffenderAge,
  detailOffenderRace,
  detailOffenderSex,
  detailRelationshipData,
 } from '../util/data'

const demoData = who => ([
  {
    data: detailOffenderAge,
    title: (who) ? `Age of ${who}` : undefined,
    type: 'histogram',
  },
  {
    data: detailOffenderRace,
    title: (who) ? `Race of ${who}` : undefined,
    type: 'table',
  },
  {
    data: detailOffenderSex,
    title: (who) ? `Sex of ${who}` : undefined,
    type: 'table',
  },
])

const locationData = [
  {
    data: detailLocationData,
    type: 'table',
  },
]

const relationshipData = [
  {
    data: detailRelationshipData,
    type: 'table',
  },
]

const detailOffenderDemographicsData = demoData('offender')
const detailVictimDemographicsData = demoData('victim')

const crimeIds = {
  'aggravated-assault': 'aggravated assault',
  burglary: 'burglary',
  murder: 'murder and nonnegligent homicide',
  rape: 'rape (legacy definition)',
  robbery: 'robbery',
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
  const { filters, summaries } = appState
  const place = startCase(params.place)
  const trendData = mungeSummaryData(summaries, params.place)

  return (
    <div className='site-wrapper'>
      <Sidebar
        dispatch={dispatch}
        filters={filters}
        router={router}
      />
      <div className='site-content'>
        <div className='p3 sm-px8 container'>
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
          <div className='mb8 p2 sm-p4 bg-white'>
            {summaries.loading && <div className='h4'>Loading...</div>}
            {trendData && !summaries.loading && (
              <TimeChart data={trendData} keys={['National', place]} />
            )}
          </div>
          <div className='mb2 p2 sm-p4 bg-blue-lighter'>
            <h2 className='m0 fs-ch1 sans-serif'>
              {startCase(crime)} Incident Details in {place},
              <br />
              {filters.timeFrom}–{filters.timeTo}
            </h2>
          </div>
          <div className='mb8'>
            <div className='clearfix mxn1'>
              <div className='md-col md-col-6 mb2 px1'>
                <IncidentDetailCard
                  data={detailOffenderDemographicsData}
                  title='Offender demographics'
                />
              </div>
              <div className='md-col md-col-6 mb2 px1'>
                <IncidentDetailCard
                  data={detailVictimDemographicsData}
                  title='Victim demographics'
                />
              </div>
              <div className='md-col md-col-6 mb2 px1'>
                <IncidentDetailCard
                  data={relationshipData}
                  title='Victims relationship to offender'
                />
              </div>
              <div className='md-col md-col-6 mb2 px1'>
                <IncidentDetailCard
                  data={locationData}
                  title='Location type'
                />
              </div>
            </div>
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
