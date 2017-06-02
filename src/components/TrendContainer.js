import snakeCase from 'lodash.snakecase'
import startCase from 'lodash.startcase'
import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import DownloadDataBtn from './DownloadDataBtn'
import Loading from './Loading'
import NoData from './NoData'
import TrendChart from './TrendChart'
import TrendSourceText from './TrendSourceText'
import { generateCrimeReadme } from '../util/content'
import { getPlaceInfo } from '../util/place'
import mungeSummaryData from '../util/summary'

const TrendContainer = ({
  crime,
  dispatch,
  place,
  placeType,
  since,
  summaries,
  until,
}) => {
  let chart
  const { loading } = summaries
  const download = [
    {
      content: generateCrimeReadme({
        crime,
        title: `Reported ${pluralize(crime)} in ${startCase(place)}, ${since}-${until}`,
      }),
      filename: 'README.md',
    },
  ]

  if (loading) chart = <Loading />
  else {
    const data = mungeSummaryData({
      crime: snakeCase(crime === 'rape' ? 'rape_legacy' : crime),
      summaries: summaries.data,
      place,
      since,
      until,
    })
    if (!data || data.length === 0) chart = <NoData />
    else {
      download.push({
        data,
        filename: `${place}-${crime}-${since}–${until}.csv`,
      })
      chart = (
        <div>
          <TrendChart
            crime={crime}
            data={data}
            dispatch={dispatch}
            keys={Object.keys(summaries.data).map(k => startCase(k))}
            place={place}
            since={since}
            until={until}
          />
          <DownloadDataBtn
            data={download}
            filename={`${place}-${crime}-${since}–${until}`}
          />
        </div>
      )
    }
  }

  return (
    <div>
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 sm-mb5 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} rate in {startCase(place)},{' '}
          {since}–{until}
        </h2>
        {chart}
      </div>
      {!loading &&
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
  dispatch: PropTypes.func.isRequired,
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
