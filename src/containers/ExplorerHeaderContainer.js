/* eslint-disable no-nested-ternary */
import React from 'react'
import { connect } from 'react-redux'

import ExplorerIntro from '../components/explorer/ExplorerIntro'
import Loading from '../components/Loading'
import PlaceThumbnail from '../components/PlaceThumbnail'
import UcrResourcesList from '../components/UcrResourcesList'
import { getAgency, oriToState } from '../util/agencies'
import { getPlaceInfo } from '../util/place'
import lookup from '../util/usa'

const ExplorerHeaderContainer = ({
  agencies,
  agency,
  coordinates,
  crime,
  isAgency,
  participation,
  place,
  placeType,
  until,
}) => {
  const isLoading = isAgency ? agencies.loading : participation.loading
  const usState = isAgency ? oriToState(place) : place
  const placeDisplay = isAgency ? agency.agency_name : lookup(place).display

  return (
    <div>
      <div className="items-baseline mt2 mb4">
        <h1 className="flex-auto m0 pb-tiny fs-22 sm-fs-32 border-bottom border-blue-light">
          {isAgency && isLoading ? 'Loading agency...' : placeDisplay}
        </h1>
      </div>
      <div className="mb5 clearfix">
        <div className="sm-col sm-col-8 mb2 lg-m0 p0 sm-pr4 lg-pr6 fs-18">
          {isLoading
            ? <Loading />
            : <ExplorerIntro
                agency={agency}
                crime={crime}
                place={place}
                participation={participation}
                until={until}
              />}
          <UcrResourcesList
            crime={crime}
            place={usState}
            placeType={placeType}
          />
        </div>
        <div className="sm-col sm-col-4 xs-hide">
          <PlaceThumbnail coordinates={coordinates} usState={usState} />
          <div className="mt-tiny fs-12 serif italic">
            {isAgency && !isLoading
              ? `${placeDisplay}, ${lookup(usState).display}`
              : placeDisplay}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ agencies, filters, participation }) => {
  const { place, placeType } = getPlaceInfo(filters)
  const { crime, until } = filters
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)
  const { icpsr_lat: lat, icpsr_lng: lng } = agency
  const coordinates = isAgency && lat && lng && { lat, lng }

  return {
    agencies,
    agency,
    coordinates,
    crime,
    isAgency,
    participation,
    place,
    placeType,
    until,
  }
}

export default connect(mapStateToProps)(ExplorerHeaderContainer)
