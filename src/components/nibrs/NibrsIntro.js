import { max } from 'd3-array'
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
  placeDisplay,
  totalCount,
  until,
}) => {
  const noun = 'offense'
  if (isAgency) {
    return (
      <p className="m0 sm-col-10">
        <p>
          This agency reported {highlight(formatNum(totalCount))} individual{' '}
          {crime} {pluralize(noun, totalCount)} to the FBI between{' '}
          {highlight(nibrsFirstYear)} and {highlight(until)}.
        </p>
        <p className="fs-12 serif italic">
          The complexity of NIBRS data presents unique impediments to interconnecting
          all facets of the information collected. In instances of multiple
          offenders, for example, the Crime Data Explorer currently links an offender
          to only one offense—the first listed. The same is true for incidents
          involving multiple victims. The Uniform Crime Reporting Program is
          working hard to improve these specific functions within the Crime Data
          Explorer so that presentations in the coming months will fully encompass
          all aspects of the NIBRS data.
        </p>
      </p>
    )
  }

  const agencyCts = participation.map(p => p.nibrs_participating_agencies)
  const agencyCt = max(agencyCts)

  return (
    <p className="m0 sm-col-10">
      <p>
        There were {highlight(formatNum(totalCount))} individual {crime}{' '}
        {pluralize(noun, totalCount)} reported to the FBI in {placeDisplay}{' '}
        between {highlight(nibrsFirstYear)} and {highlight(until)} by{' '}
        {highlight(agencyCt)} law enforcement {pluralize('agency', agencyCt)}{' '}
        reporting {nibrsTerm} data.
      </p>
      <p className="fs-12 serif italic">
        The complexity of NIBRS data presents unique impediments to interconnecting
        all facets of the information collected. In instances of multiple
        offenders, for example, the Crime Data Explorer currently links an offender
        to only one offense—the first listed. The same is true for incidents
        involving multiple victims. The Uniform Crime Reporting Program is
        working hard to improve these specific functions within the Crime Data
        Explorer so that presentations in the coming months will fully encompass
        all aspects of the NIBRS data.
      </p>
    </p>
  )
}

NibrsIntro.propTypes = {
  crime: PropTypes.string.isRequired,
  isAgency: PropTypes.bool.isRequired,
  nibrsFirstYear: PropTypes.number.isRequired,
  placeDisplay: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  participation: PropTypes.array.isRequired,
  until: PropTypes.number.isRequired,
}

export default NibrsIntro
