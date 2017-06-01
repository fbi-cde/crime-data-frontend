import startCase from 'lodash.startcase'
import React from 'react'
import { connect } from 'react-redux'

import ExplorerHeader from './ExplorerHeader'
import PlaceThumbnail from './PlaceThumbnail'
import UcrResourcesList from './UcrResourcesList'
import { getPlaceInfo } from '../util/place'
import { getAgency, oriToState } from '../util/ori'

const ExplorerHeaderContainer = ({
  agency,
  crime,
  place,
  placeType,
  ucr,
  until,
}) => {
  const placeName = (agency && agency.agency_name) || place
  const usState = agency ? oriToState(place) : place

  return (
    <div>
      <div className="items-baseline mt2 mb4">
        <h1 className="flex-auto m0 pb-tiny fs-22 sm-fs-32 border-bottom border-blue-lighter">
          {startCase(placeName)}
          {' '} | {' '}
          {startCase(crime)}
        </h1>
      </div>
      <div className="mb5 clearfix">
        <div className="lg-col lg-col-8 mb2 lg-m0 p0 lg-pr6 fs-18">
          <ExplorerHeader
            agency={agency}
            loading={agency ? false : ucr.loading}
            place={place}
            placeType={placeType}
            until={until}
            ucr={ucr.data}
          />
          <UcrResourcesList place={usState} placeType={placeType} />
        </div>
        <div className="lg-col lg-col-4 xs-hide sm-hide md-hide">
          <PlaceThumbnail selected={startCase(usState)} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ agencies, filters, ucr }) => {
  const { place, placeType } = getPlaceInfo(filters)
  const { crime, until } = filters
  const agency = placeType === 'agency' && getAgency(agencies, place)

  return {
    agency,
    crime,
    place,
    placeType,
    ucr,
    until,
  }
}

export default connect(mapStateToProps)(ExplorerHeaderContainer)
