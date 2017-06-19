import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import { nibrsTerm, srsTerm } from './Terms'

const ExplorerIntroAgency = ({ county, name, state, type, hasNibrs }) => {
  const showCounty =
    (county && type === 'City') || type === 'University or College'
  return (
    <p className="serif">
      The {startCase(name)} law enforcement agency is located in
      {' '}
      {showCounty && `${county} County, `}
      {startCase(state)}. This agency reports
      {' '}
      {hasNibrs ? nibrsTerm : srsTerm}
      {' '}
      data to the FBI.
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
