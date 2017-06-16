import lowerCase from 'lodash.lowercase'
import upperFirst from 'lodash.upperfirst'
import PropTypes from 'prop-types'
import React from 'react'

import Term from './Term'
import { estimatedTerm, nibrsTerm, srsTerm } from './Terms'
import { formatNum } from '../util/formats'
import mapCrimeToGlossaryTerm from '../util/glossary'

const ExplorerIntroNational = ({ crime, ucr, until }) => {
  const isArson = crime === 'arson'
  const untilUcr = ucr.find(p => p.year === until)
  const crimeTerm = (
    <Term id={mapCrimeToGlossaryTerm(crime)} size="sm">
      {upperFirst(lowerCase(crime))}
    </Term>
  )

  return (
    <div>
      {!isArson
        ? <div>
            <p className="serif">
              {crimeTerm} rates for the nation are derived from both
              {' '}
              {srsTerm}
              {' '}
              and
              {' '}
              {nibrsTerm}
              {' '}
              reports voluntarily submitted to the FBI.
            </p>
            <p className="serif">
              In
              {' '}
              {until}
              , the FBI
              {' '}
              {estimatedTerm}
              {' '}
              crime statistics for the nation based on data received from
              {' '}
              {formatNum(untilUcr.participating_agencies)}
              {' '}
              law enforcement agencies out of
              {' '}
              {formatNum(untilUcr.total_agencies)}
              {' '}
              in the country that year.
            </p>
          </div>
        : <div>
            <p className="serif">
              The number of arson incidents in the United States is derived from
              both
              {' '}
              {srsTerm}
              {' '}
              and
              {' '}
              {nibrsTerm}
              {' '}
              reports sent to the FBI.
            </p>
            <p className="serif">
              In {until}, the FBI received voluntary reports of arson from
              {' '}
              {formatNum(untilUcr.participating_agencies)}
              {' '}
              law enforcement agencies. The charts below feature unestimated
              data.
            </p>
          </div>}
    </div>
  )
}

ExplorerIntroNational.propTypes = {
  crime: PropTypes.string,
  ucr: PropTypes.array,
  until: PropTypes.number,
}

export default ExplorerIntroNational
