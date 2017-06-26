import { format } from 'd3-format'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

const fmt = format(',.0f')

const NibrsHistogramDetails = ({ data, noun }) => {
  const { ct, x0, x1 } = data
  const noSelection = !x0 && !x1
  const strong = v => <strong className="red">{v}</strong>

  if (noSelection) {
    return (
      <div className="mh6 fs-14">
        Age was reported for {strong(fmt(ct))} {pluralize(noun)}.
      </div>
    )
  }

  return (
    <div className="mh6 fs-14">
      There {pluralize('were', ct)} {strong(fmt(ct))}{' '}
      {pluralize('incidents', ct)} involving {pluralize(noun)}{' '}
      with a reported age of {strong(`${x0}-${x1 - 1}`)}.
    </div>
  )
}

NibrsHistogramDetails.propTypes = {
  data: PropTypes.object.isRequired,
  noun: PropTypes.string.isRequired,
}

export default NibrsHistogramDetails
