import { format } from 'd3-format'
import PropTypes from 'prop-types'
import React from 'react'

import Term from './Term'

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

const ExplorerNationalIntroduction = ({ crime, ucr, until }) => {
  const isArson = crime === 'arson'
  const untilUcr = ucr.find(p => p.year === until)

  return (
    <div>
      {!isArson
        ? <div>
            <p className="serif">
              Crime rates for the nation are derived from both
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
              In {until}, the FBI estimated crime statistics for the nation
              based on data voluntarily reported by{' '}
              {formatNumber(untilUcr.participating_agencies)}{' '}
              law enforcement agencies.
            </p>
          </div>
        : <div>
            <p className="serif">
              The number of arson incidents in the United States is derived from both
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
              {formatNumber(untilUcr.participating_agencies)}
              {' '}
              law enforcement agencies. The charts below feature unestimated data.
            </p>
          </div>}
    </div>
  )
}

ExplorerNationalIntroduction.propTypes = {
  crime: PropTypes.string,
  ucr: PropTypes.array,
  until: PropTypes.number,
}

export default ExplorerNationalIntroduction
