import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import Term from './Term'

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

const ExplorerAgencyIntroduction = ({
  agencyCounty,
  agencyName,
  agencyState,
  agencyType,
  submitsNibrs,
}) => (
  <p className="serif">
    The {startCase(agencyName)} law enforcement agency is located
    {' '}
    in
    {' '}
    {agencyCounty && agencyType !== 'County' && `${agencyCounty} County, `}
    {startCase(agencyState)}
    . This
    {' '}
    agency reports
    {' '}
    {submitsNibrs ? nibrsTerm : srsTerm}
    {' '}
    data to the FBI.
  </p>
)

ExplorerAgencyIntroduction.defaultProps = {
  submitsNibrs: false,
}

ExplorerAgencyIntroduction.propTypes = {
  agencyCounty: PropTypes.string,
  agencyName: PropTypes.string.isRequired,
  agencyState: PropTypes.string.isRequired,
  agencyType: PropTypes.string.isRequired,
  submitsNibrs: PropTypes.bool,
}

export default ExplorerAgencyIntroduction
