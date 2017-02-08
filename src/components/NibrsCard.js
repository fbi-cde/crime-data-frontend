import React from 'react'

import NibrsHistogram from './NibrsHistogram'
import NibrsTable from './NibrsTable'

const NibrsCard = ({ data, title }) => {
  const charts = data.map((d, i) => {
    const props = { key: i, data: d.data, title: d.title }
    switch (d.type) {
      case 'histogram':
        return <NibrsHistogram {...props} />
      case 'table':
        return <NibrsTable {...props} />
      default:
        return <p key={i}>{d.type} not supported!</p>
    }
  })

  return (
    <div className='p2 sm-p3 bg-white'>
      <h2 className='mt0 mb2 pb1 fs-18 sm-fs-22 sans-serif border-bottom'>{title}</h2>
      {charts}
    </div>
  )
}

NibrsCard.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  title: React.PropTypes.string.isRequired,
}

export default NibrsCard
