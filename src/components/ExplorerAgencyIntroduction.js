import startCase from 'lodash.startcase'
import React from 'react'

const ExplorerAgencyIntroduction = ({
  agencyCounty = '[County Name]',
  agencyName,
  agencyState,
}) => (
  <p className="serif">
    {startCase(agencyName)} is located
    in {agencyCounty} County, {startCase(agencyState)}. This law enforcement
    agency reports [incident-based data (NIBRS)] to the
    FBI.
  </p>
)

export default ExplorerAgencyIntroduction
