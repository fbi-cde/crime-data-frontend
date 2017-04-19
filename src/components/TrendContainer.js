import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import Loading from './Loading'
import NoData from './NoData'
import TrendChart from './TrendChart'
import TrendSourceText from './TrendSourceText'


const dataByYear = data => (
  Object.assign(
    ...Object.keys(data).map(k => ({
      [k]: Object.assign(...data[k].map(d => ({ [d.year]: d }))),
    })),
  )
)

const mungeSummaryData = (summaries, ucr, place) => {
  if (!summaries || !summaries[place]) return false

  const keys = Object.keys(summaries)
  const summaryByYear = dataByYear(summaries)
  const ucrByYear = dataByYear(ucr)

  return summaries[place].map(d => (
    Object.assign(
      { date: d.year },
      ...keys.map(k => {
        const count = summaryByYear[k][d.year].actual
        const pop = ucrByYear[k][d.year].total_population
        return { [k]: { count, pop, rate: (count / pop) * 100000 } }
      }),
    )
  ))
}

const TrendContainer = ({
  crime,
  dispatch,
  place,
  placeType,
  since,
  summaries,
  ucr,
  until,
}) => {
  const loading = summaries.loading || ucr.loading

  let content = null
  if (loading) content = <Loading />
  else {
    const data = mungeSummaryData(summaries.data, ucr.data, place)
    if (!data || data.length === 0) content = <NoData />
    else {
      content = (
        <TrendChart
          crime={crime}
          data={data}
          dispatch={dispatch}
          keys={Object.keys(summaries.data).map(k => startCase(k))}
          place={place}
          since={since}
          until={until}
        />
      )
    }
  }

  return (
    <div>
      <div className='mb2 p2 sm-p4 bg-blue-lighter'>
        <h2 className='m0 fs-24 sm-fs-32 sans-serif'>
          {startCase(crime)} rate in {startCase(place)},{' '}
          <br className='xs-hide' />
          {since}–{until}
        </h2>
      </div>
      <div className='mb2'>{content}</div>
      {!loading && (
        <TrendSourceText
          dispatch={dispatch}
          place={place}
          placeType={placeType}
          since={since}
          until={until}
        />
      )}
    </div>
  )
}

TrendContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summaries: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  ucr: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

export default TrendContainer
