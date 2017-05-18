import { format } from 'd3-format'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import Loading from './Loading'
import PlaceThumbnail from './PlaceThumbnail'
import Term from './Term'
import content from '../util/content'
import ucrParticipation from '../util/ucr'
import lookupUsa, { nationalKey } from '../util/usa'

const formatNumber = format(',')

const participationCsvLink = (place, type) => {
  if (type === 'agency') return []

  const path = place === nationalKey
    ? 'participation/national'
    : `participation/states/${lookupUsa(place).toUpperCase()}`

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

const UcrParticipationInformation = ({
  dispatch,
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

  const reports = (
    <span>
      {hybrid && 'both '}
      {participation.srs &&
        <Term dispatch={dispatch} id={'summary reporting system (srs)'}>
          summary (SRS)
        </Term>}
      {hybrid && ' and '}
      {participation.nibrs &&
        <Term
          dispatch={dispatch}
          id={'national incident-based reporting system (nibrs)'}
        >
          incident-based (NIBRS)
        </Term>}
    </span>
  )

  return (
    <div className="mb5 clearfix">
      <div className="lg-col lg-col-8 mb2 lg-m0 p0 lg-pr6 fs-18">
        {ucr.loading && <Loading />}
        {!ucr.loading &&
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
              law enforcement agencies. The charts below
              feature estimated data.
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
        <PlaceThumbnail selected={startCase(place)} />
      </div>
    </div>
  )
}

UcrParticipationInformation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  until: PropTypes.number.isRequired,
  ucr: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
}

export default UcrParticipationInformation
