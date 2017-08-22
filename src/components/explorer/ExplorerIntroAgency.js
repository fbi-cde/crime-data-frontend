import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'
import PropTypes from 'prop-types'
import React from 'react'

import Term from '../Term'
import { NibrsTerm, SrsTerm } from '../Terms'
import mapCrimeToGlossaryTerm from '../../util/glossary'
import lookupUsa from '../../util/usa'

const ExplorerIntroAgency = ({
  county,
  crime,
  hasNibrs,
  name,
  usState,
  type,
}) => {
  const showCounty =
    (county && type === 'City') || type === 'University or College'
  const crimeTerm = (
    <Term id={mapCrimeToGlossaryTerm(crime)}>
      {upperFirst(lowerCase(crime))}
    </Term>
  )

  return (
    <p className="serif">
      The {startCase(name)} is located in {showCounty && `${county} County, `}
      {lookupUsa(usState).display}. {crimeTerm} totals for this agency are
      voluntarily submitted to the FBI using{' '}
      {hasNibrs ? <NibrsTerm /> : <SrsTerm />} reports.
    </p>
  )
}

ExplorerIntroAgency.defaultProps = {
  hasNibrs: false,
}

ExplorerIntroAgency.propTypes = {
  county: PropTypes.string,
  name: PropTypes.string.isRequired,
  usState: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hasNibrs: PropTypes.bool,
}

export default ExplorerIntroAgency
