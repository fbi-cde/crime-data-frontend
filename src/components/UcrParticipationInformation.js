import { format } from 'd3-format'
import React from 'react'
import startCase from 'lodash.startcase'

import content from '../util/content'
import Term from './Term'
import ucrParticipation from '../util/ucr'

const formatNumber = format(',')

const UcrParticipationInformation = ({ dispatch, place, timeTo, ucr }) => {
  const links = (content.states[startCase(place)] || []).filter(l => l.text)
  const participation = ucrParticipation(place)
  const placeInfo = { ...ucr.data[place] }

  return (
    <div className='mb5 clearfix'>
      <div className='sm-col sm-col-8 mb2 sm-m0 p0 sm-pr2 fs-18 serif'>
        <p>
          {startCase(place)} reports {
            (participation.hybrid && 'both')
          }
          {(participation.srs || participation.hybrid) && (
            <Term
              dispatch={dispatch}
              id={'summary reporting system (srs)'}
            >
              summary (SRS)
            </Term>
          )}
          {participation.hybrid && 'and'}
          {(participation.nibrs || participation.hybrid) && (
            <Term
              dispatch={dispatch}
              id={'national incident-based reporting system (nibrs)'}
            >
              incident-level (NIBRS)
            </Term>
          )} data to the FBI.
        </p>
        {/* eslint max-len: 0 */}
        {!ucr.loading && (
        <p>
          In {timeTo}, {placeInfo.reporting_agencies} {startCase(place)} law enforcement agencies participated in the <Term dispatch={dispatch} id={'uniform crime reporting (ucr)'}>Uniform Crime Reporting</Term> Program, out of a total of {placeInfo.total_agencies} agencies. For that year, these statistics cover {Math.round(placeInfo.reporting_rate * 100)}% of the state’s total population, or about {formatNumber(placeInfo.total_population)} people.
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

export default UcrParticipationInformation
