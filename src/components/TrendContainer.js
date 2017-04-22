import snakeCase from 'lodash.snakecase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'

import Loading from './Loading'
import NoData from './NoData'
import TrendChart from './TrendChart'
import TrendSourceText from './TrendSourceText'


const mungeSummaryData = (crime, summaries, place) => {
  if (!summaries || !summaries[place]) return false

  const keys = Object.keys(summaries)
  return summaries[place].map(year => {
    const data = { date: year.year }
    keys.forEach(key => {
      const source = key !== place ? summaries[key].find(d => d.year === data.date) : year
      data[key] = {
        pop: source.population,
        count: source[crime],
        rate: (source[crime] / source.population) * 100000,
      }
    })
    return data
  })
}

const TrendContainer = ({
  crime,
  dispatch,
  place,
  placeType,
  since,
  summaries,
  until,
}) => {
  const loading = summaries.loading

  let content = null
  if (loading) content = <Loading />
  else {
    const data = mungeSummaryData(snakeCase(crime), summaries.data, place)
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
  until: React.PropTypes.number.isRequired,
}

export default TrendContainer
