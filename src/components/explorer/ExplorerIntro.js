import PropTypes from 'prop-types'
import React from 'react'

import ErrorCard from '../ErrorCard'
import ExplorerIntroAgency from './ExplorerIntroAgency'
import ExplorerIntroNational from './ExplorerIntroNational'
import ExplorerIntroState from './ExplorerIntroState'
import ExplorerIntroRegion from './ExplorerIntroRegion'
import { oriToState } from '../../util/agencies'
import { nationalKey } from '../../util/usa'

const ExplorerIntro = ({ agency, filters, participation, region, states  }) => {
  if (agency) {
    return (
      <ExplorerIntroAgency
        county={agency.primary_county}
        crime={filters.crime}
        hasNibrs={agency.nibrs_months_reported === 12}
        name={agency.agency_name}
        usState={oriToState(filters.place)}
        type={agency.agency_type_name}
      />
    )
  }

  if (participation.loading) return null

  if (participation.error) return <ErrorCard error={participation.error} />

  if (filters.place === nationalKey) {
    return (
      <ExplorerIntroNational
        crime={filters.crime}
        until={filters.until}
        participation={participation.data[nationalKey]}
      />
    )
  }

  if(filters.placeType === 'region'){
    return <ExplorerIntroRegion
      crime={filters.crime}
      place={filters.place}
      until={filters.until}
      region={region}
      states={states}
      participation={participation.data[filters.place]}
    />
  }

  return (
    <ExplorerIntroState
      crime={filters.crime}
      place={filters.place}
      until={filters.until}
      participation={participation.data[filters.place]}
    />
  )
}

ExplorerIntro.propTypes = {
  agency: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  participation: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  filters: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  states: PropTypes.object.isRequired,
}

export default ExplorerIntro
