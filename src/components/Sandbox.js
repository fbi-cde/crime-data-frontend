import React from 'react'

import BarChart from './BarChart'
import Cartogram from './Cartogram'
import Table from './Table'
import TimeChart from './TimeChart'

import StateSvg from './StateSvg'

import { timeData, timeData2, mapData } from '../util/data'

const Sandbox = ({ appState }) => {
  const { state: usaState } = appState.filters
  const map = (usaState) ? { [usaState]: 1 } : mapData
  return (
    <div className='p3 bg-white border-left border-silver'>
      <div className='mb3'>
        <StateSvg state={usaState || 'dc'} size={120} />
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
      <div className='mb3'>
        <Table
          data={[
            ['Hamburger', 'Beef', 'Onion', 'Bun'],
            ['Pizza', 'Pork', 'Tomato', 'Crust'],
            ['Corndog', 'Pork', 'Corn', 'Cornbread'],
            ['Hot Dog', 'Pork', 'Peppers', 'Bun'],
          ]}
          headings={['Name', 'Meat', 'Vegetable', 'Carb']}
          cls='table-bordered table-striped'
        />
      </div>
    </div>
  )
}

Sandbox.defaultProps = {
  appState: { filters: {} },
}

export default Sandbox
