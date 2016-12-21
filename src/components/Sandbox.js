import { Link } from 'react-router'
import React from 'react'

import BarChart from './BarChart'
import Cartogram from './Cartogram'
import TimeChart from './TimeChart'

import StateSvg from './StateSvg'

import { timeData, timeData2, mapData } from '../util/data'

const Sandbox = ({ appState }) => {
  const { state } = appState.filters
  const map = (state) ? { ...mapData, [state.toUpperCase()]: 1 } : mapData
  return (
    <div className='p3 bg-white border-left'>
      <div className='mb3'>
        <Link to='/explorer/ohio/murder'>Murder in Ohio</Link>
      </div>
      <div className='mb3'>
        <StateSvg state='dc' color='steelblue' />
        <StateSvg state='ca' color='tomato' />
        <StateSvg state='ny' color='springgreen' />
      </div>
      <div className='mb3'>
        <Cartogram data={map} />
      </div>
      <div className='mb3'>
        <TimeChart data={timeData2} keys={['foo', 'bar']} />
      </div>
      <div className='mb3'>
        <BarChart data={timeData} labels={false} />
      </div>
    </div>
  )
}

Sandbox.defaultProps = {
  appState: { filters: {} },
}

export default Sandbox
