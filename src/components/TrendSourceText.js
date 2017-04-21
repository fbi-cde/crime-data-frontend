import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import Term from './Term'
import ucrParticipation from '../util/ucr'


const TrendSourceText = ({ dispatch, place, since, until }) => {
  const ucr = ucrParticipation(place)

  let text
  if (ucr.srs && ucr.nibrs) {
    text = (
      <span>
        <Term id='summary reporting system (srs)' dispatch={dispatch}>
          Summary (SRS)
        </Term>
        {' and '}
        <Term id='national incident-based reporting system (nibrs)' dispatch={dispatch}>
          summarized incident (NIBRS)
        </Term>
      </span>
    )
  } else if (ucr.srs && !ucr.nibrs) {
    text = (
      <span>
        <Term id='summary reporting system (srs)' dispatch={dispatch}>
          Summary (SRS)
        </Term>
      </span>
    )
  } else if (!ucr.srs && ucr.nibrs) {
    text = (
      <span>
        <Term id='national incident-based reporting system (nibrs)' dispatch={dispatch}>
          Summarized incident (NIBRS)
        </Term>
      </span>
    )
  }

  return (
    <div className='center italic fs-12 mb8'>
      <p>
        Source: {text} data from {startCase(place)}, {since}–{until}.
      </p>
    </div>
  )
}

TrendSourceText.propTypes = {
  dispatch: PropTypes.func,
  place: PropTypes.string,
  since: PropTypes.number.isRequired,
  until: PropTypes.number.isRequired,
}

export default TrendSourceText
