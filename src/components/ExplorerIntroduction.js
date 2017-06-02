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

export default ExplorerIntroduction
