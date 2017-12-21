import { max } from 'd3-array'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

import { nibrsTerm } from '../Terms'

const highlight = txt =>
  <strong>
    {txt}
  </strong>

const SHRIntro = ({
  since,
  participation,
  placeDisplay,
  until,
}) => {
  const agencyCts = participation.map(p => p.nibrs_participating_agencies)
  const agencyCt = max(agencyCts)

  return (
    <div className="m0 sm-col-10">
      <p>
        Expanded Homicide Data created by the FBI in {placeDisplay}{' '}
        between {highlight(since)} and {highlight(until)} by{' '}
        {highlight(agencyCt)} law enforcement {pluralize('agency', agencyCt)}{' '}
        reporting {nibrsTerm} data.
      </p>
    </div>
  )
}

SHRIntro.propTypes = {
  since: PropTypes.number.isRequired,
  placeDisplay: PropTypes.string.isRequired,
  until: PropTypes.number.isRequired,
  participation: PropTypes.array.isRequired,
}

export default SHRIntro
