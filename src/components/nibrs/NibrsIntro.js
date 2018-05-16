import { max } from 'd3-array'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'
import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'

import { NibrsTerm } from '../Terms'
import { formatNum } from '../../util/formats'
import { MAX_YEAR } from '../../util/years'

import Term from '../Term'
import mapCrimeToGlossaryTerm from '../../util/glossary'

const highlight = txt => <strong>{txt}</strong>

const NibrsIntro = ({
  crime,
  isAgency,
  selectedYear,
  selectedYearNoun,
  participation,
  placeDisplay,
  totalCount
}) => {
  const noun = 'incident'

  if (isAgency) {
    return (
      <div className="m0 sm-col-12 serif fs-18 border-bottom border-blue-light">
        <p>
          In {highlight(selectedYearNoun)}, this agency reported{' '}
          {highlight(formatNum(totalCount))} individual{' '}
          <Term id={mapCrimeToGlossaryTerm(crime)}>
            {upperFirst(lowerCase(crime))}
          </Term>{' '}
          <Term id={startCase(noun)}>
            {upperFirst(lowerCase(pluralize(noun, totalCount)))}
          </Term>{' '}
          to the FBI.
        </p>
      </div>
    )
  }
  let agencyCt
  let untilUcr

  if (
    selectedYear &&
    selectedYear !== 2 &&
    selectedYear !== 5 &&
    selectedYear !== 10
  ) {
    untilUcr = participation.find(p => p.data_year === selectedYear)
    if (untilUcr) {
      agencyCt = untilUcr.agency_count_nibrs_submitting
    }
    return (
      <div className="m0 sm-col-12 serif fs-18 border-bottom border-blue-light">
        <p>
          In {highlight(selectedYearNoun)}, there were{' '}
          {highlight(formatNum(totalCount))} individual {crime}{' '}
          {pluralize(noun, totalCount)} reported to the FBI in {placeDisplay} by{' '}
          {highlight(agencyCt)} law enforcement {pluralize('agency', agencyCt)}{' '}
          reporting <NibrsTerm /> data.
        </p>
      </div>
    )
  }
  return (
    <div className="m0 sm-col-12 serif fs-18 border-bottom border-blue-light">
      <p>
        In {highlight(selectedYearNoun)}, there were{' '}
        {highlight(formatNum(totalCount))} individual {crime} reported to the
        FBI in {placeDisplay} by law enforcement agencies reporting{' '}
        <NibrsTerm /> data.
      </p>
    </div>
  )
}

NibrsIntro.propTypes = {
  crime: PropTypes.string.isRequired,
  isAgency: PropTypes.bool.isRequired,
  selectedYear: PropTypes.number,
  placeDisplay: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  participation: PropTypes.array.isRequired,
  selectedYearNoun: PropTypes.string.isRequired
}

export default NibrsIntro
