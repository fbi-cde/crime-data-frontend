import { format } from 'd3-format'
import pluralize from 'pluralize'
import React from 'react'

const fmt = format(',.0f')

const NibrsHistogramDetails = ({ data, noun }) => {
  const highlight = v => (<span className='bold red'>{v}</span>)
  const noSelection = !data.x0 && !data.x1

  return (
    <div className='mh6 mt1 fs-14'>
      {noSelection && (
        <p>There were {highlight(fmt(data.ct))} reported {pluralize(noun)}.</p>
      )}
      {!noSelection && (
        <p>There were {highlight(fmt(data.ct))} incidents
        involving {pluralize(noun)} aged {highlight(`${data.x0}-${data.x1 - 1}`)}.</p>
      )}
    </div>
  )
}

export default NibrsHistogramDetails
