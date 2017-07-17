import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import Term from './Term'

import ucrParticipationLookup from '../util/participation'

const estimatedTerm = (
  <Term id="estimated data" size="sm">
    Estimated
  </Term>
)
const nibrsTerm = (
  <Term id={'national incident-based reporting system (nibrs)'} size="sm">
    incident-based (NIBRS)
  </Term>
)
const srsTerm = (
  <Term id={'summary reporting system (srs)'} size="sm">
    summary (SRS)
  </Term>
)

const TrendSourceText = ({ crime, place }) => {
  const isArson = crime === 'arson'
  const { nibrs, srs } = ucrParticipationLookup(place)
  const hybrid = nibrs && srs

  return (
    <div className="fs-12 italic serif">
      {!isArson
        ? <p>
            Source: FBI, {estimatedTerm} data for {startCase(place)}.
          </p>
        : <p>
            Source: Reported {srs && srsTerm}
            {hybrid && ' and '}
            {nibrs && nibrsTerm} data from {startCase(place)}.
          </p>}
    </div>
  )
}

TrendSourceText.propTypes = {
  crime: PropTypes.string,
  place: PropTypes.string,
}

export default TrendSourceText
