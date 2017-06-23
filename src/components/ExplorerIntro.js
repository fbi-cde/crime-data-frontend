import PropTypes from 'prop-types'
import React from 'react'

import ErrorCard from './ErrorCard'
import ExplorerIntroAgency from './ExplorerIntroAgency'
import ExplorerIntroNational from './ExplorerIntroNational'
import ExplorerIntroState from './ExplorerIntroState'
import { oriToState } from '../util/ori'
import { nationalKey } from '../util/usa'

const ExplorerIntro = ({ agency, crime, place, ucr, until }) => {
  if (agency) {
    return (
      <ExplorerIntroAgency
        county={agency.primary_county}
        crime={crime}
        hasNibrs={agency.nibrs_months_reported === 12}
        name={agency.agency_name}
        state={oriToState(place)}
        type={agency.agency_type_name}
      />
    )
  }

  if (ucr.loading) return null

  if (ucr.error) return <ErrorCard error={ucr.error} />

  if (place === nationalKey) {
    return (
      <ExplorerIntroNational
        crime={crime}
        until={until}
        ucr={ucr.data[nationalKey]}
      />
    )
  }

  return (
    <ExplorerIntroState
      crime={crime}
      place={place}
      until={until}
      ucr={ucr.data[place]}
    />
  )
}

ExplorerIntro.propTypes = {
  agency: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  ucr: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

export default ExplorerIntro
