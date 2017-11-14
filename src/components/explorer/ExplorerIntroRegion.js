import lowerCase from 'lodash.lowercase'
import upperFirst from 'lodash.upperfirst'
import React from 'react'

import Term from '../Term'
import { formatNum } from '../../util/formats'
import mapCrimeToGlossaryTerm from '../../util/glossary'
import { EstimatedTerm, NibrsTerm, SrsTerm } from '../Terms'
import { lookupRegionByName } from '../../util/location'

const highlight = txt =>
  <strong>
    {txt}
  </strong>

const ExplorerIntroRegion = ({ crime, participation, until, placeName, states, region, place }) => {
  const isArson = crime === 'arson'
  const untilUcr = participation.find(p => p.year === until)
  const regionTotalObj = {};
  regionTotalObj.participating_agencies = 0;
  regionTotalObj.total_agencies = 0;


  participation.forEach(item => {
    if (item.year === until) {
      regionTotalObj.total_agencies += item.total_agencies
      regionTotalObj.participating_agencies += item.participating_agencies
    }
  });

  const stateNames = []
  const regionCode = lookupRegionByName(region.regions, place).region_code

  Object.keys(states.states).forEach(key => {
    if (states.states[key].region_code === regionCode) {
      stateNames.push(` ${states.states[key].state_name}, `)
    }
  });


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
              {crimeTerm} rates for the {placeName} are derived from both <SrsTerm />{' '}
              and <NibrsTerm /> reports voluntarily submitted to the FBI.
            </p>
            <p className="serif">
              The {placeName} consists of the follow states: {stateNames}
            </p>
            <p className="serif">
              In {highlight(until)}
              , the FBI <EstimatedTerm /> crime statistics for the {placeName} based
              on data received from{' '}
              {highlight(formatNum(regionTotalObj.participating_agencies))} law
              enforcement agencies out of{' '}
              {highlight(formatNum(regionTotalObj.total_agencies))} in the country
              that year.
            </p>
          </div>
        : <div>
            <p className="serif">
              The number of arson incidents in the United States is derived from
              both <SrsTerm /> and <NibrsTerm /> reports sent to the FBI.
            </p>
            <p className="serif">
              In {highlight(until)}, the FBI received voluntary reports of arson
              from {highlight(formatNum(untilUcr.participating_agencies))} law
              enforcement agencies. The charts below feature unestimated data.
            </p>
          </div>}
    </div>
  )
}


ExplorerIntroRegion.propTypes = {}

export default ExplorerIntroRegion
