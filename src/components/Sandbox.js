import React from 'react'

import BarChart from './BarChart'
import Cartogram from './Cartogram'
import Glossary from './Glossary'
import TimeChart from './TimeChart'

import { timeData, mapData } from '../util/data'

const Sandbox = () => (
  <div>
    <div className='p2 container'>
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
    <Glossary />
  </div>
)

export default Sandbox
