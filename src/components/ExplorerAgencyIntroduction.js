import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

const ExplorerAgencyIntroduction = ({
  agencyCounty = '[County Name]',
  agencyName,
  agencyState,
  agencyType = '[Agency Type]',
}) => (
  <p className="serif">
    The {startCase(agencyName)} {agencyType} is located
    in {agencyCounty} County, {startCase(agencyState)}. This law enforcement
    agency reports [incident-based data (NIBRS)] to the
    Uniform Crime Reporting (UCR) program.
  </p>
)

export default ExplorerAgencyIntroduction
