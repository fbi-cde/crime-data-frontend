import startCase from 'lodash.startcase'
import React from 'react'

import { estimatedTerm, nibrsTerm, srsTerm } from './Terms'
import { formatNum } from '../util/formats'
import ucrParticipationLookup from '../util/ucr'

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

  return (
    <div>
      {!isArson
        ? <div>
            <p className="serif">
              Crime rates for {startCase(place)} are derived from
              {' '}
              {reportTerms}
              {' '}
              reports sent to the FBI.
            </p>
            <p className="serif">
              In
              {' '}
              {until}
              , the FBI {estimatedTerm} crime statistics for
              {' '}
              {startCase(place)}
              {' '}
              based on data voluntarily reported by
              {' '}
              {formatNum(untilUcr.participating_agencies)}
              {' '}
              law enforcement agencies.
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
