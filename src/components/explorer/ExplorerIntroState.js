import lowerCase from 'lodash.lowercase'
import upperFirst from 'lodash.upperfirst'
import React from 'react'

import Term from '../Term'
import { EstimatedTerm, NibrsTerm, SrsTerm } from '../Terms'
import { formatNum } from '../../util/formats'
import mapCrimeToGlossaryTerm from '../../util/glossary'
import ucrParticipationLookup from '../../util/participation'

const getReportTerms = ({ nibrs, srs, hybrid }) =>
  <span>
    {hybrid && 'both '}
    {srs && <SrsTerm />}
    {hybrid && ' and '}
    {nibrs && <NibrsTerm />}
  </span>

const getStateReportingHistory = ({ nibrs, hybrid, placeName }) => {
  if (!nibrs) return false

  let text
  if (hybrid) {
    text = (
      <span>
        has historically reported <SrsTerm /> data and began including{' '}
        <NibrsTerm /> data in {nibrs['initial-year']}
      </span>
    )
  } else if (!hybrid && nibrs) {
    text = (
      <span>
        historically reported <SrsTerm /> data but switched to submitting{' '}
        <NibrsTerm /> data in {nibrs['initial-year']}
      </span>
    )
  }

  return (
    <span>
      The {placeName} state UCR Program {text}.
    </span>
  )
}

const highlight = txt =>
  <strong>
    {txt}
  </strong>

const ExplorerIntroState = ({ crime, place, participation, until, placeName }) => {
  const isArson = crime === 'arson'
  const { nibrs, srs } = ucrParticipationLookup(place)
  const hybrid = nibrs && srs
  const untilUcr = participation.find(p => p.year === until)


  const reportTerms = getReportTerms({ nibrs, srs, hybrid: nibrs && srs })

  const stateProgram = {
    nibrs,
    place,
    srs,
    hybrid,
  }

  const programHistory = getStateReportingHistory(stateProgram, placeName)
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
              {crimeTerm} rates for {placeName} are derived from{' '}
              {reportTerms} reports voluntarily submitted to the FBI.{' '}
              {programHistory}
            </p>
            <p className="serif">
              In {highlight(until)}
              , the FBI <EstimatedTerm /> crime statistics for {placeName}{' '}
              based on data received from{' '}
              {highlight(formatNum(untilUcr.participating_agencies))} law
              enforcement agencies out of{' '}
              {highlight(formatNum(untilUcr.total_agencies))} agencies in the
              state that year.
            </p>
          </div>
        : <div>
            <p className="serif">
              {placeName} reports {reportTerms} data to the FBI.
            </p>
            <p className="serif">
              In {until}, {formatNum(untilUcr.participating_agencies)}{' '}
              {placeName} law enforcement agencies voluntarily reported data
              to the FBI. The charts below feature unestimated data.
            </p>
          </div>}
    </div>
  )
}

ExplorerIntroState.propTypes = {}

export default ExplorerIntroState
