import React from 'react'

import Histogram from './Histogram'
import IncidentDetailTable from './IncidentDetailTable'

import { timeData } from '../util/data'

const IncidentDetailCard = ({ data, title }) => (
  <div className='p2 sm-p3 bg-white rounded'>
    <h3 className='mt0 mb2 pb-tiny border-bottom'>{title}</h3>
    <div className='mb2 pb2 border-bottom'>
      <div className='mb1 bold'>Victim age</div>
      <Histogram data={timeData} />
    </div>
    <IncidentDetailTable data={data} title='Gender of victim' />
    <IncidentDetailTable data={data} title='Race of victim' />
  </div>
)

IncidentDetailCard.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
}

export default IncidentDetailCard
