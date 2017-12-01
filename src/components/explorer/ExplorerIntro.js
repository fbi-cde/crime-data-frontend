import PropTypes from 'prop-types'
import React from 'react'

import ErrorCard from '../ErrorCard'
import ExplorerIntroAgency from './ExplorerIntroAgency'
import ExplorerIntroNational from './ExplorerIntroNational'
import ExplorerIntroState from './ExplorerIntroState'
import ExplorerIntroRegion from './ExplorerIntroRegion'
import { newOriToState } from '../../util/agencies'
import { nationalKey } from '../../util/usa'

const ExplorerIntro = ({ agency, filters, participation, placeName, region, states }) => {
  if (agency) {
    console.log('ExplorerIntro:', agency, newOriToState(filters.place, states), agency.county_name, agency.agency_type_name, filters.crime)

    return (
      <ExplorerIntroAgency
        county={agency.county_name}
        crime={filters.crime}
        name={agency.agency_name_edit}
        usState={newOriToState(filters.place, states)}
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

  if (filters.placeType === 'region') {
    return (<ExplorerIntroRegion
      crime={filters.crime}
      until={filters.until}
      placeName={placeName}
      participation={participation.data[filters.place]}
      states={states}
      region={region}
      place={filters.place}
    />)
  }

  return (
    <ExplorerIntroState
      crime={filters.crime}
      place={filters.place}
      until={filters.until}
      participation={participation.data[filters.place]}
      placeName={placeName}
    />
  )
}

ExplorerIntro.propTypes = {
  agency: PropTypes.object,
  participation: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  filters: PropTypes.object.isRequired,
  placeName: PropTypes.string,
  states: PropTypes.object,
  region: PropTypes.object,
}

export default ExplorerIntro
