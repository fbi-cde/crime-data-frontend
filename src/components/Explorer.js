import React from 'react'
import startCase from 'lodash.startcase'

import Breadcrumbs from './Breadcrumbs'
import Census from './Census'
import DetailsCard from './DetailsCard'
import Sidebar from './Sidebar'
import Term from './Term'
import TimeChart from './TimeChart'

import { censusData, detailData, timeData2 } from '../util/data'

const Explorer = ({ params, dispatch }) => {
  const { crime } = params
  const state = startCase(params.state)

  return (
    <div className='site-wrapper'>
      <Sidebar dispatch={dispatch} />
      <div className='site-content'>
        <div className='p2 sm-p3 container'>
          <Breadcrumbs {...params} />
          <div className='md-flex items-baseline mb4 border-bottom'>
            <h1 className='flex-auto my0 md-mb1 serif'>{state}</h1>
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
          <div className='clearfix mb3 mxn1'>
            <div className='sm-col sm-col-8 px1'>
              <p className='bold'>
                Incidents of <Term>{crime}</Term> are on the
                rise in {state}, but lower than 5 or 10 years ago.
              </p>
              <p>
                {state}&#39;s {crime} rate surpassed that of the U.S. in 1985, and peaked
                in 1991, with a rate of over 52 incidents per 100,000
                people.<sup>1</sup>
              </p>
            </div>
            <div className='sm-col-right sm-col-4 px1'>
              <Census data={censusData} />
            </div>
          </div>
          <div className='mb3 p2 sm-p3 bg-white rounded'>
            <div className='right mxn1'>
              <img className='px1' width='24' src='/img/download.svg' alt='download' />
              <img className='px1' width='24' src='/img/share.svg' alt='share' />
            </div>
            <h3 className='mt0 mb3'>Reported {crime}s in {state}, 2005 - 2014</h3>
            <TimeChart data={timeData2} keys={['foo', 'bar']} />
          </div>
          <div>
            <h2 className='pb1 serif border-bottom border-silver'>Details</h2>
            <div className='clearfix mxn1'>
              <div className='sm-col sm-col-6 p1'>
                <DetailsCard data={detailData} title='Title!' />
              </div>
              <div className='sm-col sm-col-6 p1'>
                <DetailsCard data={detailData} title='Title!' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Explorer.defaultProps = {
  params: { crime: 'murder', state: 'ohio' },
}

export default Explorer
