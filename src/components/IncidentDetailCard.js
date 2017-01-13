import React from 'react'

import Histogram from './Histogram'
import IncidentDetailTable from './IncidentDetailTable'

const IncidentDetailCard = ({ data, title }) => {
  const datasets = data.map(d => {
    switch (d.type) {
      case 'histogram':
        return (
          <div className='mb2 pb2 border-bottom'>
            <div className='mb1 bold'>{d.title}</div>
            <Histogram data={d.data} />
          </div>
        )
      case 'table':
        return (
          <IncidentDetailTable data={d.data} title={d.title} />
        )
      default:
        return (<p>{d.type} not handled</p>)
    }
  })

  return (
    <div className='p2 sm-p3 bg-white rounded'>
      <h3 className='mt0 mb2 pb-tiny border-bottom'>{title}</h3>
      { datasets }
    </div>
  )
}

IncidentDetailCard.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
}

export default IncidentDetailCard
