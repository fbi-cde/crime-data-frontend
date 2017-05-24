import { format } from 'd3-format'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import Loading from './Loading'
import PlaceThumbnail from './PlaceThumbnail'
import Term from './Term'
import content from '../util/content'
import { getAgency, oriToState } from '../util/ori'
import { getPlaceInfo } from '../util/place'
import ucrParticipation from '../util/ucr'
import lookupUsa, { nationalKey } from '../util/usa'

const formatNumber = format(',')

const participationCsvLink = (place, type) => {
  if (type === 'agency') return []

  const path = place === nationalKey
    ? 'participation/national'
    : `participation/states/${lookupUsa(place)}`

  return [
    {
      text: 'Download participation and population data',
      url: `/api/${path}?output=csv`,
    },
  ]
}

const locationLinks = (place, type) => {
  if (type === 'agency') return []

  let links
  if (place === nationalKey) {
    links = content.locations.national
  } else {
    links = content.locations.states[startCase(place)] || []
  }
  return links.filter(l => l.text)
}

const UcrParticipationContainer = ({
  agencyInfo,
  crime,
  place,
  placeType,
  until,
  ucr,
}) => {
  const csvLinks = participationCsvLink(place, placeType)
  const links = locationLinks(place, placeType).concat(csvLinks)
  const participation = ucrParticipation(place)
  const hybrid = participation.srs && participation.nibrs
  const ucrPlaceInfo = !ucr.loading && ucr.data[place]
  const data = ucrPlaceInfo && { ...ucrPlaceInfo.find(p => p.year === until) }

  const isAgency = placeType === 'agency'
  const usState = startCase(isAgency ? oriToState(place) : place)

  const reports = (
    <span>
      {hybrid && 'both '}
      {participation.srs &&
        <Term id={'summary reporting system (srs)'}>
          summary (SRS)
        </Term>}
      {hybrid && ' and '}
      {participation.nibrs &&
        <Term id={'national incident-based reporting system (nibrs)'}>
          incident-based (NIBRS)
        </Term>}
    </span>
  )

  return (
    <div className="mb5 clearfix">
      <div className="lg-col lg-col-8 mb2 lg-m0 p0 lg-pr6 fs-18">
        {isAgency &&
          <div>
            <p className="serif">
              The {agencyInfo.agency_name} [Agency Type] is located
              in [County Name], {usState}. This law enforcement
              agency reports [incident-based data (NIBRS)] to the
              Uniform Crime Reporting (UCR) program.
            </p>
            <h3 className="mt4 mb1 fs-18">Resources</h3>
            <ul className="m0 p0 fs-14 left-bars">
              <li className="mb1">
                <a href="#!">About {crime} data</a>
              </li>
              <li className="mb1">
                <a href="#!">{usState} UCR Program</a>
              </li>
              <li className="mb1">
                <a href="#!">FBI UCR Program</a>
              </li>
            </ul>
          </div>}
        {!isAgency && ucr.loading && <Loading />}
        {!isAgency &&
          !ucr.loading &&
          data &&
          data.year &&
          <div>
            <p className="serif">
              Crime rates for {startCase(place)}{' '}
              are derived from {reports} reports sent to the FBI.
            </p>
            <p className="serif">
              In {until}, the FBI estimated crime statistics for{' '}
              {place !== nationalKey ? startCase(place) : 'the nation'}{' '}
              based on data voluntarily reported by{' '}
              {formatNumber(data.participating_agencies)}{' '}
              law enforcement agencies.
            </p>
            <h3 className="mt4 mb1 fs-18">UCR resources</h3>
            <ul className="m0 p0 fs-14 left-bars">
              {links.map((l, i) => (
                <li className="mb1" key={i}>
                  <a href={l.url}>{l.text}</a>
                </li>
              ))}
            </ul>
          </div>}
      </div>
      <div className="lg-col lg-col-4 xs-hide sm-hide md-hide">
        <PlaceThumbnail selected={usState} />
      </div>
    </div>
  )
}

UcrParticipationContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  until: PropTypes.number.isRequired,
  ucr: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
}

const mapStateToProps = ({ agencies, filters, ucr }) => {
  const { place, placeType } = getPlaceInfo(filters)
  const agencyInfo = placeType === 'agency' && getAgency(agencies, place)

  return {
    agencyInfo,
    ...filters,
    place,
    placeType,
    ucr,
  }
}

export default connect(mapStateToProps)(UcrParticipationContainer)
