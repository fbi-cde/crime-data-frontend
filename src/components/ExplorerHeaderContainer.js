import startCase from 'lodash.startcase'
import React from 'react'
import { connect } from 'react-redux'

import ExplorerIntroduction from './ExplorerIntroduction'
import Loading from './Loading'
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
  const isAgency = placeType === 'agency'
  const usState = startCase(agency ? oriToState(place) : place)
  const isLoading = !isAgency && ucr.loading

  return (
    <div>
      <div className="items-baseline mt2 mb4">
        <h1 className="flex-auto m0 pb-tiny fs-22 sm-fs-32 border-bottom border-blue-lighter">
          {startCase((agency && agency.agency_name) || place)}
          {' '} | {' '}
          {startCase(crime)}
        </h1>
      </div>
      <div className="mb5 clearfix">
        <div className="lg-col lg-col-8 mb2 lg-m0 p0 lg-pr6 fs-18">
          {isLoading
            ? <Loading />
            : <ExplorerIntroduction
                agency={agency}
                crime={crime}
                place={place}
                ucr={ucr}
                until={until}
              />}
          <UcrResourcesList place={usState} placeType={placeType} />
        </div>
        <div className="lg-col lg-col-4 xs-hide sm-hide md-hide">
          <PlaceThumbnail selected={usState} isAgency={isAgency} />
          {isAgency &&
            <div className="mt-tiny fs-14">
              <span
                className="mr1 inline-block bg-red-bright circle"
                style={{ width: 8, height: 8 }}
              />
              {agency.agency_name}
            </div>}
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
