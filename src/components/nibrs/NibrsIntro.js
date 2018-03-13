import { max } from 'd3-array'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'
import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'

import { nibrsTerm } from '../Terms'
import { formatNum } from '../../util/formats'
import Term from '../Term'
import mapCrimeToGlossaryTerm from '../../util/glossary'

const highlight = txt =>
  <strong>
    {txt}
  </strong>

const NibrsIntro = ({
  crime,
  isAgency,
  selectedYear,
  participation,
  placeDisplay,
  totalCount,
}) => {
  const noun = 'incident'

  if (isAgency) {
    return (
      <div className="m0 sm-col-12 serif fs-18 border-bottom border-blue-light">
        <p>
          In {highlight((selectedYear))}, this agency reported {highlight(formatNum(totalCount))} individual{' '}
          <Term id={mapCrimeToGlossaryTerm(crime)}>
            {upperFirst(lowerCase(crime))}
          </Term>  <Term id={startCase(noun)}>
            {upperFirst(lowerCase(pluralize(noun, totalCount)))}
          </Term>  to the FBI.
        </p>
      </div>
    )
  }
  const agencyCts = participation.map(p => p.nibrs_participating_agencies)
  const agencyCt = max(agencyCts)

  return (
    <div className="m0 sm-col-12 serif fs-18 border-bottom border-blue-light">
      <p>
        In {highlight((selectedYear))}, there were {highlight(formatNum(totalCount))} individual {crime}{' '}
        {pluralize(noun, totalCount)} reported to the FBI in {placeDisplay}{' '} by{' '}
        {highlight(agencyCt)} law enforcement {pluralize('agency', agencyCt)}{' '}
        reporting {nibrsTerm} data.
      </p>
    </div>
  )
}

NibrsIntro.propTypes = {
  crime: PropTypes.string.isRequired,
  isAgency: PropTypes.bool.isRequired,
  selectedYear: PropTypes.number.isRequired,
  placeDisplay: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  participation: PropTypes.array.isRequired,
}

export default NibrsIntro
