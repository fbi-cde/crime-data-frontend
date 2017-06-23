/* eslint-disable no-nested-ternary */
import startCase from 'lodash.startcase'
import React from 'react'
import { connect } from 'react-redux'

import ExplorerIntro from '../components/ExplorerIntro'
import Loading from '../components/Loading'
import PlaceThumbnail from '../components/PlaceThumbnail'
import UcrResourcesList from '../components/UcrResourcesList'
import { getPlaceInfo } from '../util/place'
import { getAgency, oriToState } from '../util/ori'

const ExplorerHeaderContainer = ({
  agencies,
  agency,
  crime,
  isAgency,
  place,
  placeType,
  ucr,
  until,
}) => {
  const isLoading = isAgency ? agencies.loading : ucr.loading
  const usState = isAgency ? oriToState(place) : place
  const placeDisplay = isAgency
    ? `${agency.agency_name} agency`
    : startCase(usState)

  return (
    <div>
      <div className="items-baseline mt2 mb4">
        <h1 className="flex-auto m0 pb-tiny fs-22 sm-fs-32 border-bottom border-blue-lighter">
          {isAgency
            ? isLoading ? 'Loading agency...' : placeDisplay
            : startCase(usState)}
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
                ucr={ucr}
                until={until}
              />}
          <UcrResourcesList
            crime={crime}
            place={usState}
            placeType={placeType}
          />
        </div>
        <div className="sm-col sm-col-4 xs-hide">
          <PlaceThumbnail selected={startCase(usState)} />
          <div className="mt-tiny fs-12 serif italic right">
            {isAgency && !isLoading
              ? `${placeDisplay}, ${startCase(usState)}`
              : startCase(usState)}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ agencies, filters, ucr }) => {
  const { place, placeType } = getPlaceInfo(filters)
  const { crime, until } = filters
  const isAgency = placeType === 'agency'
  const agency = isAgency && !agencies.loading && getAgency(agencies, place)

  return {
    agencies,
    agency,
    crime,
    isAgency,
    place,
    placeType,
    ucr,
    until,
  }
}

export default connect(mapStateToProps)(ExplorerHeaderContainer)
