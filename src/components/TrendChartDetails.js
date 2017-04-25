import { format } from 'd3-format'
import lowerCase from 'lodash.lowercase'
import React from 'react'

import Term from './Term'
import mapCrimeToGlossaryTerm from '../util/glossary'
import { nationalKey } from '../util/usa'


const formatRate = n => format(`,.${+n > 10 ? 0 : 1}f`)(n)
const formatTotal = format(',.0f')

const highlight = v => <span className='bold blue'>{v}</span>
const getComparison = ({ place, data }) => {
  const threshold = 3
  const placeRate = data[place].rate
  const nationalRate = data[nationalKey].rate
  const diff = ((placeRate / nationalRate) - 1) * 100
  const diffAbs = Math.abs(diff)

  return (diffAbs < threshold) ? (
    <span>{highlight(`about the same (within ${threshold}%)`)} as</span>
  ) : (
    <span>
      {highlight(`${formatRate(diffAbs)}% ${diff > threshold ? 'higher' : 'lower'}`)}
      {' '}than
    </span>
  )
}

const TrendChartDetails = ({ colors, crime, data, dispatch, keys }) => {
  const { name, slug } = keys[0]
  const comparison = getComparison({ place: slug, data })
  const rate = data[slug].rate
  const year = data.date.getFullYear()

  const isOnlyNational = keys.length === 1
  const term = (
    <Term dispatch={dispatch} id={mapCrimeToGlossaryTerm(crime)}>
      {lowerCase(crime)}
    </Term>
  )

  return (
    <div className='mb3 lg-flex'>
      <div className='flex-auto'>
        <h4 className='mt0 mb1 fs-18 sans-serif'>{year}</h4>
        <p className='mb1 lg-m0 lg-pr4 lg-mh-72p fs-14 sm-fs-16'>
          {isOnlyNational && (<span>
            There were {highlight(formatRate(rate))} incidents of {term} per 100,000 people.
          </span>)}
          {!isOnlyNational && (<span>
            {name}’s {term} rate was {comparison} that of the United States, and
            in {highlight(year)} was {highlight(formatRate(rate))} incidents
            per 100,000 people.
          </span>)}
        </p>
      </div>
      <div>
        <table className='mb1 lg-m0 p2 md-p3 col-12 sm-col-5 bg-blue-white'>
          <thead className='fs-12 line-height-3'>
            <tr><td /><td>Rate</td><td>Total</td></tr>
          </thead>
          <tbody className='fs-14 bold'>
            {keys.map((k, i) => (
              <tr key={i}>
                <td
                  className='pr2 sm-pr3 fs-12 nowrap truncate align-bottom'
                  style={{ maxWidth: 125 }}
                >
                  <span
                    className='mr1 inline-block circle'
                    style={{ width: 8, height: 8, backgroundColor: colors[i] || '#000' }}
                  />
                  {k.name}
                </td>
                <td className='pt1 pr2 sm-pr3 line-height-4 align-bottom'>
                  <span
                    className='inline-block border-bottom border-blue-light border-w2'
                    style={{ width: 72 }}
                  >
                    {formatRate(data[k.slug].rate)}
                  </span>
                </td>
                <td className='pt1 line-height-4 align-bottom'>
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
