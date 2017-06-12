import PropTypes from 'prop-types'
import React from 'react'

import ExplorerAgencyIntroduction from './ExplorerAgencyIntroduction'
import ExplorerNationalIntroduction from './ExplorerNationalIntroduction'
import ExplorerUsStateIntroduction from './ExplorerUsStateIntroduction'
import { oriToState } from '../util/ori'
import { nationalKey } from '../util/usa'

const ExplorerIntroduction = ({ agency, crime, place, ucr, until }) => {
  if (agency) {
    return (
      <ExplorerAgencyIntroduction
        agencyName={agency.agency_name}
        agencyCounty={agency.primary_county}
        agencyState={oriToState(place)}
        agencyType={agency.agency_type_name}
        submitsNibrs={agency.nibrs_months_reported === 12}
      />
    )
  }

  if (ucr.loading) return null

  if (place === nationalKey) {
    return (
      <ExplorerNationalIntroduction
        crime={crime}
        until={until}
        ucr={ucr.data[nationalKey]}
      />
    )
  }

  return (
    <ExplorerUsStateIntroduction
      crime={crime}
      place={place}
      until={until}
      ucr={ucr.data[place]}
    />
  )
}

ExplorerIntroduction.propTypes = {
  agency: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  ucr: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

export default ExplorerIntroduction
