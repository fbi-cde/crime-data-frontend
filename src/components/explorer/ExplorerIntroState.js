import lowerCase from 'lodash.lowercase'
import upperFirst from 'lodash.upperfirst'
import React from 'react'

import Term from '../Term'
import { EstimatedTerm, NibrsTerm, SrsTerm } from '../Terms'
import { formatNum } from '../../util/formats'
import mapCrimeToGlossaryTerm from '../../util/glossary'
import ucrParticipationLookup from '../../util/participation'

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

const ExplorerIntroState = ({ pageType, page, place, participation, until, placeName }) => {
  const isCrime = page === 'crime'
  const isArson = pageType === 'arson'
  const { nibrs, srs } = ucrParticipationLookup(place)
  const untilUcr = participation.find(p => p.data_year === until)
  let totalAgencies = 0
  let coveredAgencies = 0
  if (untilUcr) {
    totalAgencies = untilUcr.total_agency_count
    coveredAgencies = untilUcr.covered_agency_count
  }

  if (isCrime) {
    const reportTerms = getReportTerms({ nibrs, srs, hybrid: nibrs && srs })
    const crimeTerm = (
      <Term id={mapCrimeToGlossaryTerm(pageType)}>
        {upperFirst(lowerCase(pageType))}
      </Term>
    )

    return (
      <div>
        {!isArson
          ? <div>
              <p className="serif">
                {crimeTerm} rates for {placeName} are derived from{' '}
                {reportTerms} reports voluntarily submitted to the FBI.
              </p>
              <p className="serif">
                In {highlight(until)}
                , the FBI <EstimatedTerm /> crime statistics for{' '}

                {placeName} based on data received from{' '}
                {highlight(formatNum(totalAgencies - coveredAgencies))} law
                enforcement agencies out of{' '}
                {highlight(formatNum(totalAgencies))} agencies in the
                state that year.
              </p>
            </div>
          : <div>
              <p className="serif">
                {placeName} reports {reportTerms} data to the FBI.
              </p>
              <p className="serif">

                In {until}, {formatNum(totalAgencies - coveredAgencies)}{' '}
                {placeName} law enforcement agencies voluntarily
                reported data to the FBI. The charts below feature unestimated
                data.
              </p>
            </div>}
      </div>
    )
  }
  return (<div />)
}

ExplorerIntroState.propTypes = {}

export default ExplorerIntroState
