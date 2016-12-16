import { Link } from 'react-router'
import React from 'react'

import BarChart from './BarChart'
import Cartogram from './Cartogram'
import TimeChart from './TimeChart'

import StateSvg from './StateSvg'

import { timeData, timeData2, mapData } from '../util/data'

const Sandbox = () => (
  <div>
    <div className='p2 container'>
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
        <TimeChart data={timeData2} keys={['foo', 'bar']} />
      </div>
      <div className='mb3'>
        <BarChart data={timeData} labels={false} />
      </div>
    </div>
  </div>
)

export default Sandbox
