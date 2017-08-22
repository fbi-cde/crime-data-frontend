import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'

import { nibrsTerm } from '../Terms'
import { formatNum } from '../../util/formats'

const highlight = txt =>
  <strong>
    {txt}
  </strong>

const NibrsIntro = ({
  crime,
  isAgency,
  nibrsFirstYear,
  participation,
  place,
  placeDisplay,
  totalCount,
  until,
}) => {
  const noun = 'offense'
  if (isAgency) {
    return (
      <p className="m0 sm-col-9">
        This agency reported {highlight(formatNum(totalCount))} individual{' '}
        {crime} {pluralize(noun, totalCount)} to the FBI between{' '}
        {highlight(nibrsFirstYear)} and {highlight(until)}.
      </p>
    )
  }

  const ucrData = participation.data[place]
  const untilUcr = ucrData.find(p => p.year === until)
  const agencyCt = untilUcr.nibrs_participating_agencies

  return (
    <p className="m0 sm-col-9">
      There were {highlight(formatNum(totalCount))} individual {crime}{' '}
      {pluralize(noun, totalCount)} reported to the FBI in {placeDisplay}{' '}
      between {highlight(nibrsFirstYear)} and {highlight(until)} by{' '}
      {highlight(agencyCt)} law enforcement {pluralize('agency', agencyCt)}{' '}
      reporting {nibrsTerm} data.
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
  participation: PropTypes.object.isRequired,
  until: PropTypes.number.isRequired,
}

export default NibrsIntro
