import { format } from 'd3-format'
import React from 'react'

const fmt = format(',.0f')

const HistogramDetails = ({ data }) => {
  const highlight = v => <span className='bold red'>{v}</span>

  return (
    <div className='mt1 h5'>
      In 2014, there were {highlight(fmt(data.ct))} incidents
      involving victims {highlight(`${data.x0}-${data.x1 - 1}`)}.
    </div>
  )
}

export default HistogramDetails
