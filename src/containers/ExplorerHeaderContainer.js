/* eslint-disable no-nested-ternary */
import React from 'react'
import { connect } from 'react-redux'

import ExplorerIntro from '../components/explorer/ExplorerIntro'
import Loading from '../components/Loading'
import PlaceThumbnail from '../components/PlaceThumbnail'
import UcrResourcesList from '../components/UcrResourcesList'
import { getAgency, oriToState } from '../util/agencies'
import { lookupDisplayName } from '../util/location'

const ExplorerHeaderContainer = ({
  agencies,
  agency,
  coordinates,
  isAgency,
  participation,
  filters,
  region,
  states,
}) => {
  const isLoading = isAgency ? agencies.loading : participation.loading
  let placeDisplay
  let location
  if (filters.placeType === 'agency') {
    placeDisplay = agency.agency_name
    location = oriToState(filters.place);
  } else if (filters.placeType === 'state' || filters.placeType === 'region') {
    placeDisplay = lookupDisplayName(filters, region.regions, states.states)
    location = filters.place;
  } else {
    placeDisplay = 'United States'
    location = filters.place;
  }
  return (
    <div>
      <div className="items-baseline mt2 mb4">
        <h1
          id="explorerHeaderTitle"
          className="flex-auto m0 pb-tiny fs-22 sm-fs-32 border-bottom border-blue-light"
        >
          {isAgency && isLoading !== 'region' ? 'Loading agency...' : placeDisplay}
        </h1>
      </div>
      <div className="mb5 clearfix">
        <div className="sm-col sm-col-8 mb2 lg-m0 p0 sm-pr4 lg-pr6 fs-18">
          {isLoading
            ? <Loading />
            : <ExplorerIntro
                agency={agency}
                participation={participation}
                filters={filters}
                placeName={placeDisplay}
                states={states}
                region={region}
              />}
          <UcrResourcesList
            crime={filters.crime}
            place={filters.place}
            placeType={filters.placeType}
            states={states}
          />
        </div>
        <div className="sm-col sm-col-4 xs-hide">
          <PlaceThumbnail placeName={location} coordinates={coordinates} />
          <div className="mt-tiny fs-12 serif italic">
            {isAgency && !isLoading
              ? `${location}, ${placeDisplay}`
              : placeDisplay}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ agencies, filters, participation, region, states }) => {
  const isAgency = filters.placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, filters.place)
  const { icpsr_lat: lat, icpsr_lng: lng } = agency
  const coordinates = isAgency && lat && lng && { lat, lng }

  return {
    agencies,
    agency,
    coordinates,
    isAgency,
    participation,
    filters,
    region,
    states,
  }
}

export default connect(mapStateToProps)(ExplorerHeaderContainer)
