import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'
import PropTypes from 'prop-types'
import React from 'react'

import Term from './Term'
import { nibrsTerm, srsTerm } from './Terms'
import mapCrimeToGlossaryTerm from '../util/glossary'

const ExplorerIntroAgency = ({
  county,
  crime,
  hasNibrs,
  name,
  state,
  type,
}) => {
  const showCounty =
    (county && type === 'City') || type === 'University or College'
  const crimeTerm = (
    <Term id={mapCrimeToGlossaryTerm(crime)} size="sm">
      {upperFirst(lowerCase(crime))}
    </Term>
  )

  return (
    <p className="serif">
      The {startCase(name)} law enforcement agency is located in
      {' '}
      {showCounty && `${county} County, `}
      {startCase(state)}.
      {' '}
      {crimeTerm} totals for this agency are voluntarily submitted to the
      FBI using
      {' '}
      {hasNibrs ? nibrsTerm : srsTerm}
      {' '}
      reports.
    </p>
  )
}

ExplorerIntroAgency.defaultProps = {
  hasNibrs: false,
}

ExplorerIntroAgency.propTypes = {
  county: PropTypes.string,
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hasNibrs: PropTypes.bool,
}

export default ExplorerIntroAgency
