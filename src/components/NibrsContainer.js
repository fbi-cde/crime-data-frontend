import { format } from 'd3-format'
import React from 'react'
import startCase from 'lodash.startcase'

import ErrorCard from './ErrorCard'
import Loading from './Loading'
import NibrsCard from './NibrsCard'
import parseNibrs from '../util/nibrs'
import Term from './Term'
import ucrParticipation from '../util/ucr'

const fbiLink = 'https://ucr.fbi.gov/ucr-program-data-collections'
const formatNumber = format(',')

const initialNibrsYear = ({ place, since }) => {
  const participation = ucrParticipation(place)
  const initYear = participation && participation.nibrs['initial-year']

  if (initYear && initYear > since) return initYear
  return since
}

const NibrsContainer = ({
  crime,
  data,
  dispatch,
  error,
  filters,
  loading,
  place,
}) => {
  const { since, until } = filters

  const nibrs = (
    <Term id='national incident-based reporting system (NIBRS)' dispatch={dispatch}>
      incident-based (NIBRS)
    </Term>
  )

  const nibrsFirstYear = initialNibrsYear({ place, since })

  let [totalCount, content] = [0, <Loading />]
  if (!loading && data) {
    const dataParsed = parseNibrs(data)
    totalCount = data.offenderRaceCode.reduce((a, b) => (a + b.count), 0)
    content = (
      <div className='clearfix mxn1'>
        {dataParsed.map((d, i) => (
          <div
            key={i}
            className={`lg-col lg-col-6 mb2 px1 ${i % 2 === 0 ? 'clear-left' : ''}`}
          >
            <NibrsCard
              crime={crime}
              place={place}
              since={nibrsFirstYear}
              until={until}
              {...d}
            />
          </div>
        ))}
      </div>
    )
  } else if (error) {
    content = <ErrorCard error={error} />
  }

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
          {startCase(crime)} incident details in {startCase(place)},{' '}
          <br className='xs-hide' />
          {since}–{until}
        </h2>
        {(nibrsFirstYear !== since) && (
          <p className='mt-tiny mb-tiny'>
            {startCase(place)} started reporting incident-based (NIBRS) data
            to the FBI in {nibrsFirstYear}.
          </p>
        )}
        <p>
          {!error && data && `
            There were ${formatNumber(totalCount)} individual ${crime} incidents
            reported to the FBI in ${startCase(place)} between ${nibrsFirstYear} and
            ${until}. This number may differ from the totals in the previous chart
            because of the differences in data sources.
          `}
          Learn more about the{' '}
          <a className='underline' href={fbiLink}>FBI’s data collections</a>.
        </p>
      </div>
      {content}
      {!loading && (
      <div className='center italic fs-12 mb8'>
        <p>Source: Reported {nibrs} data from {startCase(place)}, {nibrsFirstYear}–{until}.</p>
      </div>
      )}
    </div>
  )
}

export default NibrsContainer
