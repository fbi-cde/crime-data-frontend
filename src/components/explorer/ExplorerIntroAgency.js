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
  pageType,
  page,
  hasNibrs,
  name,
  usState,
  type
}) => {
  const showCounty =
    (county && type === 'City') || type === 'University or College'
  const crimeTerm = (
    <Term id={mapCrimeToGlossaryTerm(pageType)}>
      {upperFirst(lowerCase(pageType))}
    </Term>
  )

  if (page === 'crime') {
    return (
      <p className="serif">
        The {startCase(name)} is located in {showCounty && `${county} County, `}
        {lookupUsa(usState).display}. {crimeTerm} totals for this agency are
        voluntarily submitted to the FBI using{' '}
        {hasNibrs ? <NibrsTerm /> : <SrsTerm />} reports.
      </p>
    )
  }
  if (page === 'dataset' && pageType === 'violence-against-women') {
    return (
      <p className="serif">
        The {startCase(name)} is located in {showCounty && `${county} County, `}
        {lookupUsa(usState).display}. Details About Violent Crime Againist Women
        dataset
      </p>
    )
  }
}

ExplorerIntroAgency.defaultProps = {
  hasNibrs: false
}

ExplorerIntroAgency.propTypes = {
  county: PropTypes.string,
  page: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  usState: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hasNibrs: PropTypes.bool
}

export default ExplorerIntroAgency
