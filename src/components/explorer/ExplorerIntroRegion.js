import lowerCase from 'lodash.lowercase'
import upperFirst from 'lodash.upperfirst'
import React from 'react'

import Term from '../Term'
import { formatNum } from '../../util/formats'
import mapCrimeToGlossaryTerm from '../../util/glossary'
import { EstimatedTerm, NibrsTerm, SrsTerm } from '../Terms'


const ExplorerIntroRegion = ({ crime, participation, until, placeName }) => {
  const isArson = crime === 'arson'
  const untilUcr = participation.find(p => p.year === until)
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
              {crimeTerm} rates for the {placeName}  are derived from both <SrsTerm />{' '}
              and <NibrsTerm /> reports voluntarily submitted to the FBI
            </p>
          </div>
        : <div>
            <p className="serif">
              In {until}, {formatNum(untilUcr.participating_agencies)}{' '}
              {placeName} law enforcement agencies voluntarily
              reported data to the FBI. The charts below feature unestimated
              data.
            </p>
          </div>}
    </div>
  )
}


ExplorerIntroRegion.propTypes = {}

export default ExplorerIntroRegion
