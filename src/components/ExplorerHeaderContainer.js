import startCase from 'lodash.startcase'
import React from 'react'
import { connect } from 'react-redux'

import ExplorerAgencyIntroduction from './ExplorerAgencyIntroduction'
import ExplorerNationalIntroduction from './ExplorerNationalIntroduction'
import ExplorerUsStateIntroduction from './ExplorerUsStateIntroduction'
import Loading from './Loading'
import PlaceThumbnail from './PlaceThumbnail'
import UcrResourcesList from './UcrResourcesList'
import { getPlaceInfo } from '../util/place'
import { getAgency, oriToState } from '../util/ori'
import { nationalKey } from '../util/usa'

const ExplorerHeaderContainer = ({
  agency,
  crime,
  place,
  placeType,
  ucr,
  until,
}) => {
  const loading = ucr.loading
  const usState = agency ? oriToState(place) : place

  let introduction

  if (agency) {
    introduction = (
      <ExplorerAgencyIntroduction
        agencyName={agency.agency_name}
        agencyCounty={agency.county}
        agencyState={oriToState(place)}
        agencyType={agency.agency_type}
      />
    )
  } else if (place === nationalKey) {
    introduction = (
      <ExplorerNationalIntroduction
        crime={crime}
        until={until}
        ucr={ucr.data[nationalKey]}
      />
    )
  } else {
    introduction = (
      <ExplorerUsStateIntroduction
        crime={crime}
        place={place}
        until={until}
        ucr={ucr.data[place]}
      />
    )
  }

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
          {loading && <Loading />}
          {!loading && introduction}
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
