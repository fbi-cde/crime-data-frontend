import { format } from 'd3-format'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

import { nibrsTerm } from './Terms'

const highlight = txt => <strong>{txt}</strong>
const formatNumber = format(',')

const NibrsIntro = ({
  crime,
  isAgency,
  nibrsFirstYear,
  place,
  placeDisplay,
  totalCount,
  ucr,
  until,
}) => {
  if (isAgency) {
    return (
      <p className="m0 sm-col-9">
        This agency reported {highlight(formatNumber(totalCount))}{' '}
        individual {crime} {pluralize('incident', totalCount)} to the
        FBI between {highlight(nibrsFirstYear)} and {highlight(until)}.
      </p>
    )
  }

  const ucrData = ucr.data[place]
  const untilUcr = ucrData.find(p => p.year === until)
  const agencyCt = untilUcr.nibrs_participating_agencies

  return (
    <p className="m0 sm-col-9">
      There were {highlight(formatNumber(totalCount))} individual{' '}
      {crime} incidents reported to the FBI in {placeDisplay}{' '}
      between {highlight(nibrsFirstYear)} and {highlight(until)}{' '}
      by {highlight(agencyCt)} law enforcement{' '}
      {pluralize('agency', agencyCt)} reporting {nibrsTerm} data.
    </p>
  )
}

NibrsIntro.propTypes = {
  crime: PropTypes.string.isRequired,
  isAgency: PropTypes.bool.isRequired,
  nibrsFirstYear: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  placeDisplay: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  ucr: PropTypes.object.isRequired,
  until: PropTypes.number.isRequired,
}

export default NibrsIntro
