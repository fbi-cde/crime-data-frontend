import lowerCase from 'lodash.lowercase'
import upperFirst from 'lodash.upperfirst'
import React from 'react'
import { min } from 'd3-array'

import Term from '../Term'
import { EstimatedTerm, NibrsTerm, SrsTerm } from '../Terms'
import { formatNum } from '../../util/formats'
import mapCrimeToGlossaryTerm from '../../util/glossary'
import ucrParticipationLookup from '../../util/participation'
import lookupUsa from '../../util/usa'

const highlight = txt =>
  <strong>
    {txt}
  </strong>
const getReportTerms = ({ nibrs, srs, hybrid }) =>
  <span>
    {hybrid && 'both '}
    {srs && <SrsTerm />}
    {hybrid && ' and '}
    {nibrs && <NibrsTerm />}
  </span>

const ExplorerIntroState = ({ crime, place, participation, until }) => {
  const isArson = crime === 'arson'
  const { nibrs, srs } = ucrParticipationLookup(place)
  const untilUcr = participation.find(p => p.year === until)

  let reportYrStr = ''
  if (nibrs) {
    reportYrStr = (
      <span>
        {lookupUsa(place).display} began submitting <NibrsTerm /> data reports
        in {nibrs['initial-year']}
      </span>
    )
  }
  console.log('reportYrStr:', reportYrStr)
  /*
  console.log('participation:', participation)
  const years = participation
    .filter(p => p.nibrs_participating_agencies > 0)
    .map(p => p.year)
  for (let j = 1; j < years.length; j++) {
    console.log('j:', years[j])
  }
  const minYr = min(years)
  console.log('Min Yr:', minYr)
*/
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
              {crimeTerm} rates for {lookupUsa(place).display} are derived from{' '}
              {reportTerms} reports voluntarily submitted to the FBI.{' '}
              {reportYrStr} .
            </p>
            <p className="serif">
              In {highlight(until)}
              , the FBI <EstimatedTerm /> crime statistics for{' '}
              {lookupUsa(place).display} based on data received from{' '}
              {highlight(formatNum(untilUcr.participating_agencies))} law
              enforcement agencies out of{' '}
              {highlight(formatNum(untilUcr.total_agencies))} agencies in the
              state that year.
            </p>
          </div>
        : <div>
            <p className="serif">
              {lookupUsa(place).display} reports {reportTerms} data to the FBI.
            </p>
            <p className="serif">
              In {until}, {formatNum(untilUcr.participating_agencies)}{' '}
              {lookupUsa(place).display} law enforcement agencies voluntarily
              reported data to the FBI. The charts below feature unestimated
              data.
            </p>
          </div>}
    </div>
  )
}

ExplorerIntroState.propTypes = {}

export default ExplorerIntroState
