import lowerCase from 'lodash.lowercase'
import { plural } from 'pluralize'
import React from 'react'
import startCase from 'lodash.startcase'

import Breadcrumbs from './Breadcrumbs'
import Census from './Census'
import DetailsCard from './DetailsCard'
import Sidebar from './Sidebar'
import Term from './Term'
import TimeChart from './TimeChart'

import { censusData, detailData } from '../util/data'

const crimeIds = {
  murder: 'murder and nonnegligent homicide',
  rape: 'rape (legacy definition)',
  robbery: 'robbery',
}

const mungeSummaryData = (summaries, place) => {
  if (Object.keys(summaries).length === 1) return false
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
        <div className='p2 sm-p3 md-p4 container'>
          <Breadcrumbs {...params} />
          <div className='md-flex items-baseline mb4 border-bottom'>
            <h1 className='flex-auto my0 md-mb1 serif'>
              {place}, {filters.timeFrom}-{filters.timeTo}
            </h1>
            <div className='mxn1'>
              <a href='#!' className='btn px1 h5'>
                <img
                  className='mr-tiny align-tb'
                  width='16'
                  src='/img/download.svg'
                  alt='download'
                />
                Download data
              </a>
              <a href='#!' className='btn px1 h5'>
                <img
                  className='mr-tiny align-tb'
                  width='16'
                  src='/img/share.svg'
                  alt='share'
                />
                Share page
              </a>
            </div>
          </div>
          <div className='lg-flex mb4 mxn2'>
            <div className='flex-auto px2 h3 serif'>
              <p className='bold'>
                Incidents of
                <Term
                  dispatch={dispatch}
                  id={crimeIds[params.crime] || 'undefinedTerm'}
                >
                  {crime}
                </Term>
                are on the
                rise in {place}, but lower than 5 or 10 years ago.
              </p>
              <p>
                {place}&#39;s {crime} rate surpassed that of the U.S. in 1985, and peaked
                in 1991, with a rate of over 52 incidents per 100,000
                people.<sup>1</sup>
              </p>
            </div>
            <div className='flex-none px2'>
              <Census
                data={censusData}
                year={parseInt(filters.timeTo, 10)}
              />
            </div>
          </div>
          <div className='mb3 p2 sm-p3 bg-white rounded'>
            <div className='right mxn1'>
              <img className='px1' width='24' src='/img/download.svg' alt='download' />
              <img className='px1' width='24' src='/img/share.svg' alt='share' />
            </div>
            <h3 className='mt0 mb2'>
              Reported {plural(crime)} in {place}, {filters.timeFrom} - {filters.timeTo}
            </h3>
            {trendData && <TimeChart data={trendData} keys={['National', place]} />}
          </div>
          <div>
            <h2 className='pb1 serif border-bottom border-silver'>Details</h2>
            <div className='clearfix mxn1'>
              <div className='sm-col sm-col-6 p1'>
                <DetailsCard data={detailData} title='Murder, 2005-2014' />
              </div>
              <div className='sm-col sm-col-6 p1'>
                <DetailsCard data={detailData} title='Rape, 2005-2014' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Explorer.defaultProps = {
  params: { crime: 'murder', place: 'ohio' },
}

export default Explorer
