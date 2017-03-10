import { format } from 'd3-format'
import pluralize from 'pluralize'
import React from 'react'

const fmt = format(',.0f')

const NibrsHistogramDetails = ({ data, noun }) => {
  const { ct, x0, x1 } = data
  const noSelection = !x0 && !x1
  const strong = v => <strong className='red'>{v}</strong>

  return (
    <div className='mh6 fs-14'>
      There {pluralize('were', ct)} {strong(fmt(ct))} {pluralize('incidents', ct)}
      {noSelection ? <span>.</span> : (
        <span>{' '}involving {pluralize(noun)} aged {strong(`${x0}-${x1 - 1}`)}.</span>
      )}
    </div>
  )
}

export default NibrsHistogramDetails
