import React from 'react'

import Histogram from './Histogram'
import IncidentDetailTable from './IncidentDetailTable'

const IncidentDetailCard = ({ data, title }) => {
  const datasets = data.map((d, i) => {
    switch (d.type) {
      case 'histogram':
        return (
          <div key={i} className='mb2 pb2 border-bottom'>
            <div className='mb1 bold'>{d.title}</div>
            <Histogram data={d.data} />
          </div>
        )
      case 'table':
        return <IncidentDetailTable key={i} data={d.data} title={d.title} />
      default:
        return <p key={i}>{d.type} not handled</p>
    }
  })

  return (
    <div className='p2 sm-p3 bg-white'>
      <h2 className='mt0 mb2 pb1 fs-ch2 sans-serif border-bottom'>{title}</h2>
      {datasets}
    </div>
  )
}

IncidentDetailCard.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
}

export default IncidentDetailCard
