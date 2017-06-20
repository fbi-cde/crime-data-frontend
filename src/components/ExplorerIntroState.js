import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'
import React from 'react'

import Term from './Term'
import { estimatedTerm, nibrsTerm, srsTerm } from './Terms'
import { formatNum } from '../util/formats'
import mapCrimeToGlossaryTerm from '../util/glossary'
import ucrParticipationLookup from '../util/ucr'

const highlight = txt => <strong>{txt}</strong>

const getReportTerms = ({ nibrs, srs, hybrid }) =>
  <span>
    {hybrid && 'both '}
    {srs && srsTerm}
    {hybrid && ' and '}
    {nibrs && nibrsTerm}
  </span>

const ExplorerIntroState = ({ crime, place, ucr, until }) => {
  const isArson = crime === 'arson'
  const { nibrs, srs } = ucrParticipationLookup(place)
  const untilUcr = ucr.find(p => p.year === until)
  const reportTerms = getReportTerms({ nibrs, srs, hybrid: nibrs && srs })
  const crimeTerm = (
    <Term id={mapCrimeToGlossaryTerm(crime)}>
      {upperFirst(lowerCase(crime))}
    </Term>
  )

  return (
    <div>
      {!isArson
        ? <div>
            <p className="serif">
              {crimeTerm} rates for {startCase(place)} are derived from
              {' '}
              {reportTerms}
              {' '}
              reports voluntarily submitted to the FBI.
            </p>
            <p className="serif">
              In
              {' '}
              {highlight(until)}
              , the FBI {estimatedTerm} crime statistics for
              {' '}
              {startCase(place)}
              {' '}
              based on data received from
              {' '}
              {highlight(formatNum(untilUcr.participating_agencies))}
              {' '}
              law enforcement agencies out of
              {' '}
              {highlight(formatNum(untilUcr.total_agencies))}
              {' '}
              agencies in the state that year.
            </p>
          </div>
        : <div>
            <p className="serif">
              {startCase(place)} reports {reportTerms} data to the FBI.
            </p>
            <p className="serif">
              In {until}, {formatNum(untilUcr.participating_agencies)}
              {' '}
              {startCase(place)}
              {' '}
              law enforcement agencies voluntarily reported data to the FBI.
              The charts below feature unestimated data.
            </p>
          </div>}
    </div>
  )
}

ExplorerIntroState.propTypes = {}

export default ExplorerIntroState
