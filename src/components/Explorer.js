import React from 'react'
import startCase from 'lodash.startcase'

import Breadcrumbs from './Breadcrumbs'
import Census from './Census'
import Term from './Term'
import TimeChart from './TimeChart'

import { censusData, timeData2 } from '../util/data'

const Explorer = props => {
  const { crime } = props.params
  const state = startCase(props.params.state)

  return (
    <div className='container'>
      <div className='border-bottom clearfix pb2 mb2'>
        <Breadcrumbs {...props} />
        <span className='sm-col flex flex-center'>
          <h1 className='py0 my0 titlecase'>{ state }</h1>
        </span>
        <span className='sm-col-right flex flex-center'>
          <a className='btn'>Download this data</a>
          <a className='btn'>Share this page</a>
        </span>
      </div>
      <div className='clearfix'>
        <div className='sm-col sm-col-8'>
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
        <div className='sm-col-right sm-col-4'>
          <Census data={censusData} />
        </div>
      </div>
      <div>
        <h3>Reported {crime}s in {state}, 2005 - 2014</h3>
        <TimeChart data={timeData2} keys={['foo', 'bar']} />
      </div>
    </div>
  )
}

export default Explorer
