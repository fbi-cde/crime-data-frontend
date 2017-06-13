import PropTypes from 'prop-types'
import React from 'react'

import ExplorerIntroAgency from './ExplorerIntroAgency'
import ExplorerIntroNational from './ExplorerIntroNational'
import ExplorerIntroState from './ExplorerIntroState'
import { oriToState } from '../util/ori'
import { nationalKey } from '../util/usa'

const ExplorerIntro = ({ agency, crime, place, ucr, until }) => {
  if (agency) {
    return (
      <ExplorerIntroAgency
        name={agency.agency_name}
        county={agency.primary_county}
        state={oriToState(place)}
        type={agency.agency_type_name}
        hasNibrs={agency.nibrs_months_reported === 12}
      />
    )
  }

  if (ucr.loading) return null

  if (ucr.error) {
    return (
      <div className="p2 fs-14 white bg-red-bright">
        <strong>Uh-oh!</strong> We had trouble finding this information.
        Please try again shortly.
      </div>
    )
  }

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
