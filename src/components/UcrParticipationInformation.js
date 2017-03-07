import { format } from 'd3-format'
import React from 'react'
import startCase from 'lodash.startcase'

import content from '../util/content'
import Term from './Term'
import ucrParticipation from '../util/ucr'
import lookupUsa from '../util/usa'

const formatNumber = format(',')

const participationCsvLink = place => {
  const id = lookupUsa(place).toUpperCase()
  return [
    {
      text: 'Download participation and population data',
      url: `/api/geo/states/${id}/participation?output=csv`,
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
      <div className='sm-col sm-col-8 mb2 sm-m0 p0 sm-pr2 fs-18 serif'>
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
        {/* eslint max-len: 0 */}
        {!ucr.loading && data.year && (
          <p>
            In {until}, {data.reporting_agencies} {startCase(place)} law enforcement agencies reported data to the FBI, out of a total of {data.total_agencies}. For that year, these statistics cover {Math.round(data.reporting_rate * 100)}% of the state’s agencies or about {formatNumber(data.covered_population)} people.
          </p>
        )}
      </div>
      <ul className='sm-col sm-col-4 m0 p0 fs-14 list-style-none'>
        {links.map((l, i) => (
          <li key={i}>
            <a className='bold' href={l.url}>
              <img
                className='mr-tiny'
                width='13'
                src='/img/arrow-right.svg'
                alt='bullet'
              />
              {l.text}
            </a>
          </li>
        ))}
      </ul>
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
