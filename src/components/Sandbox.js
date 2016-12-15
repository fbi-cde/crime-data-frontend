import { Link } from 'react-router'
import React from 'react'

import BarChart from './BarChart'
import Cartogram from './Cartogram'
import Sidebar from './Sidebar'
import StateSvg from './StateSvg'
import TimeChart from './TimeChart'

import { timeData, mapData } from '../util/data'

const Sandbox = () => (
  <div className='clearfix'>
    <div className='sm-col sm-col-4 md-col-3'>
      <Sidebar />
    </div>
    <div className='sm-col sm-col-8 md-col-9'>
      <div className='p2 sm-p3'>
        <div className='mb3'>
          <Link to='/explorer/ohio/murder'>Murder in Ohio</Link>
        </div>
        <div className='mb3'>
          <StateSvg state='dc' color='steelblue' />
          <StateSvg state='ca' color='tomato' />
          <StateSvg state='ny' color='springgreen' />
        </div>
        <div className='mb3'>
          <Cartogram data={mapData} />
        </div>
        <div className='mb3'>
          <TimeChart data={timeData} />
        </div>
        <div className='mb3'>
          <BarChart data={timeData} labels={false} />
        </div>
      </div>
    </div>
  </div>
)

export default Sandbox
