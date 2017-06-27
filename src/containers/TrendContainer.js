import startCase from 'lodash.startcase'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import DownloadDataBtn from '../components/DownloadDataBtn'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import TrendChart from '../components/TrendChart'
import TrendSourceText from '../components/TrendSourceText'
import { generateCrimeReadme } from '../util/content'
import { getPlaceInfo } from '../util/place'
import mungeSummaryData from '../util/summary'

const getContent = ({ crime, place, since, summaries, until }) => {
  const { loading, error } = summaries

  if (loading) return <Loading />
  if (error) return <ErrorCard error={error} />

  const data = mungeSummaryData({
    crime,
    summaries: summaries.data,
    place,
    since,
    until,
  })

  if (!data || data.length === 0) return <NoData />

  const places = Object.keys(summaries.data)
  const fname = `${place}-${crime}-${since}-${until}`
  const title =
    `Reported ${pluralize(crime)} in ` +
    `${startCase(place)}, ${since}-${until}`

  const readme = generateCrimeReadme({ crime, title })
  const dlData = data.map(d => {
    const placeData = places.map(p => ({ [p]: { ...d[p][crime] } }))
    return { year: d.year, ...Object.assign(...placeData) }
  })

  const download = [
    { content: readme, filename: 'README.md' },
    { data: dlData, filename: `${fname}.csv` },
  ]

  return (
    <div>
      <TrendChart
        crime={crime}
        data={data}
        places={places}
        since={since}
        until={until}
      />
      <DownloadDataBtn data={download} filename={fname} />
    </div>
  )
}

const TrendContainer = props => {
  const { crime, place, placeType, since, summaries, until } = props
  const isReady = !summaries.loading

  return (
    <div className="mb7">
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 sm-mb5 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} rate in {startCase(place)}, {since}-{until}
        </h2>
        {getContent(props)}
      </div>
      {isReady &&
        <TrendSourceText
          crime={crime}
          place={place}
          placeType={placeType}
          since={since}
          until={until}
        />}
    </div>
  )
}

TrendContainer.propTypes = {
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  placeType: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summaries: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ filters, summaries }) => ({
  ...filters,
  ...getPlaceInfo(filters),
  summaries,
})

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(TrendContainer)
