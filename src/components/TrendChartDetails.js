import { format } from 'd3-format'
import lowerCase from 'lodash.lowercase'
import React from 'react'

import mapCrimeToGlossaryTerm from '../util/glossary'
import { nationalKey } from '../util/usa'
import Term from './Term'

const formatRate = format('.1f')
const formatTotal = format(',.0f')

const getComparison = ({ place, data }) => {
  const placeRate = data[place].rate
  const nationalRate = data[nationalKey].rate
  const difference = (placeRate - nationalRate)

  if (Math.abs(difference) < 2) return 'about the same as'
  else if (difference > 2) return 'higher than'
  return 'lower than'
}

const TrendChartDetails = ({ colors, crime, data, dispatch, keys }) => {
  const { name, slug } = keys[0]
  const comparison = getComparison({ place: slug, data })
  const rate = data[slug].rate
  const year = data.date.getFullYear()

  const highlight = v => <span className='bold blue'>{v}</span>
  const term = (
    <Term dispatch={dispatch} id={mapCrimeToGlossaryTerm(crime)}>
      {lowerCase(crime)}
    </Term>
  )

  return (
    <div className='mb2 md-flex'>
      <div className='flex-auto'>
        <h4 className='mt0 mb1 fs-18 sans-serif'>{year}</h4>
        <p className='sm-m0 md-pr4 fs-14 sm-fs-16'>
          {name}’s {term} rate was {comparison} that of the United States, and
          in {highlight(year)} was {highlight(formatRate(rate))} incidents
          per 100,000 people.
        </p>
      </div>
      <div>
        <table className='mt4 fs-14 bold'>
          <thead className='fs-12 caps line-height-3'>
            <tr><th /><th>Rate</th><th>Total</th></tr>
          </thead>
          <tbody>
            {keys.map((k, i) => (
              <tr key={i}>
                <td className='pr3 nowrap align-bottom'>
                  <span
                    className='mr1 inline-block circle'
                    style={{ width: 8, height: 8, backgroundColor: colors[i] || '#000' }}
                  />
                  {k.name}
                </td>
                <td className='pt1 pr3 sm-fs-14 line-height-4 align-bottom'>
                  <span
                    className='inline-block border-bottom border-blue-light border-w2'
                    style={{ width: 72 }}
                  >
                    {formatRate(data[k.slug].rate)}
                  </span>
                </td>
                <td className='pt1 sm-fs-14 line-height-4 align-bottom'>
                  <span
                    className='inline-block border-bottom border-blue-light border-w2'
                    style={{ width: 72 }}
                  >
                    {formatTotal(data[k.slug].count)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrendChartDetails
