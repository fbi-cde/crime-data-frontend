import { format } from 'd3-format'
import startCase from 'lodash.startcase'
import React from 'react'

import Term from './Term'
import content from '../util/content'
import ucrParticipation from '../util/ucr'
import lookupUsa, { nationalKey } from '../util/usa'


const formatNumber = format(',')

const participationCsvLink = place => {
  const path = (place === nationalKey)
    ? 'participation/national'
    : `geo/states/${lookupUsa(place).toUpperCase()}/participation`

  return [
    {
      text: 'Download participation and population data',
      url: `/api/${path}?output=csv`,
    },
  ]
}

const UcrParticipationInformation = ({ dispatch, place, until, ucr }) => {
  const csvLinks = participationCsvLink(place)
  const links = (content.states[startCase(place)] || []).filter(l => l.text).concat(csvLinks)
  const participation = ucrParticipation(place)
  const hybrid = (participation.srs && participation.nibrs)
  const ucrPlaceInfo = !ucr.loading && ucr.data[place]
  const data = ucrPlaceInfo && { ...ucrPlaceInfo.find(p => p.year === until) }

  if (!ucrPlaceInfo) return null

  return (
    <div className='mb5 clearfix'>
      <div className='lg-col lg-col-8 mb2 lg-m0 p0 lg-pr4 fs-18 serif'>
        <p>
          {startCase(place)} reports {
            (hybrid && 'both ')
          }
          {(participation.srs) && (
            <Term
              dispatch={dispatch}
              id={'summary reporting system (srs)'}
            >
              summary (SRS)
            </Term>
          )}
          {hybrid && ' and '}
          {participation.nibrs && (
            <Term
              dispatch={dispatch}
              id={'national incident-based reporting system (nibrs)'}
            >
              incident-based (NIBRS)
            </Term>
          )} data to the FBI.
        </p>
        {!ucr.loading && data.year && (
          <p>
            In {until}, {formatNumber(data.reporting_agencies)} {startCase(place)} law
            enforcement agencies reported data to the FBI, out of a total
            of {formatNumber(data.total_agencies)}. For that year, these statistics
            cover {Math.round(data.reporting_rate * 100)}% of the
            state’s agencies or about {formatNumber(data.covered_population)} people.
          </p>
        )}
      </div>
      <div className='lg-col lg-col-4'>
        <h3 className='mt0 mb2 fs-18 sm-fs-22'>UCR resources</h3>
        <ul className='m0 p0 fs-14 sm-fs-16 left-bars'>
          {links.map((l, i) => (
            <li className='mb1' key={i}>
              <a href={l.url}>{l.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* eslint react/forbid-prop-types: 0 */

UcrParticipationInformation.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  place: React.PropTypes.string.isRequired,
  until: React.PropTypes.number.isRequired,
  ucr: React.PropTypes.object.isRequired,
}

export default UcrParticipationInformation
