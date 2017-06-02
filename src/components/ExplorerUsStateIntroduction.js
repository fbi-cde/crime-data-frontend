import { format } from 'd3-format'
import startCase from 'lodash.startcase'
import React from 'react'

import Term from './Term'
import ucrParticipationLookup from '../util/ucr'

const formatNumber = format(',')
const nibrsTerm = (
  <Term id={'national incident-based reporting system (nibrs)'}>
    incident-based (NIBRS)
  </Term>
)
const srsTerm = (
  <Term id={'summary reporting system (srs)'}>
    summary (SRS)
  </Term>
)

const reportingTerms = ({ nibrs, srs }) => {
  const hybrid = nibrs && srs

  return (
    <span>
      {hybrid && 'both '}
      {srs && srsTerm}
      {hybrid && ' and '}
      {nibrs && nibrsTerm}
    </span>
  )
}

const ExplorerUsStateIntroduction = ({ crime, place, ucr, until }) => {
  const isArson = crime === 'arson'
  const { nibrs, srs } = ucrParticipationLookup(place)
  const untilUcr = ucr.find(p => p.year === until)

  return (
    <div>
      {!isArson
        ? <div>
            <p className="serif">
              Crime rates for {startCase(place)} are derived from
              {' '}
              {reportingTerms({ nibrs, srs })}
              {' '}
              reports sent to the FBI.
            </p>
            <p className="serif">
              In
              {' '}
              {until}
              , the FBI estimated crime statistics for
              {' '}
              {startCase(place)}
              based on data voluntarily reported by
              {' '}
              {formatNumber(untilUcr.participating_agencies)}
              {' '}
              law enforcement agencies.
            </p>
          </div>
        : <div>
            <p className="serif">
              {startCase(place)} reports {reportingTerms({ nibrs, srs })}
              {' '}
              data to the FBI.
            </p>
            <p className="serif">
              In {until}, {formatNumber(untilUcr.participating_agencies)}
              {' '}
              {startCase(place)}
              {' '}
              law enforcement agencies voluntarily reported data to the FBI. The charts below feature unestimated data.
            </p>
          </div>}
    </div>
  )
}

ExplorerUsStateIntroduction.propTypes = {}

export default ExplorerUsStateIntroduction
