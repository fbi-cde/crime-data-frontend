import lowerCase from 'lodash.lowercase'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import AgencyChart from '../components/AgencyChart'
import DownloadDataBtn from '../components/DownloadDataBtn'
import ErrorCard from '../components/ErrorCard'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import { nibrsTerm, srsTerm } from '../components/Terms'
import { getAgency } from '../util/ori'

const getContent = ({ crime, place, since, summary, until }) => {
  const { error, loading } = summary

  if (loading) return <Loading />
  if (error) return <ErrorCard error={error} />

  const data = summary.data[place]
  if (!data || data.length === 0) return <NoData />

  const fname = `${place}-${crime}-${since}–${until}`
  const dataClean = data
    .filter(d => d.year >= since && d.year <= until)
    .sort((a, b) => a.year - b.year)

  const hasNoValues =
    dataClean.length ===
    dataClean.filter(d => d.reported === 0 && d.cleared === 0).length

  const noDataText = `There were no ${lowerCase(crime)} incidents reported during this time period.`

  return (
    <div>
      {hasNoValues
        ? <NoData text={noDataText} />
        : <div>
            <AgencyChart
              crime={crime}
              data={dataClean}
              since={since}
              until={until}
            />
            <DownloadDataBtn
              data={[{ data: dataClean, filename: `${fname}.csv` }]}
              filename={fname}
            />
          </div>}
    </div>
  )
}

const AgencyChartContainer = params => {
  const { agency, crime, since, summary, until } = params
  const submitsNibrs = agency.nibrs_months_reported === 12
  const content = getContent(params)

  return (
    <div className="mb5">
      <div className="p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} incidents reported by{' '}
          {agency.display}, {since}-{until}
        </h2>
        {content}
      </div>
      {!summary.loading &&
        <div className="mt2 fs-12 serif italic">
          Source: Reported
          {' '}
          {submitsNibrs ? nibrsTerm : srsTerm}
          {' '}
          data from
          {' '}
          {agency.display}
        </div>}
    </div>
  )
}

AgencyChartContainer.propTypes = {
  agency: PropTypes.object.isRequired,
  crime: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  since: PropTypes.number.isRequired,
  summary: PropTypes.shape({
    data: PropTypes.object,
    loading: PropTypes.boolean,
  }).isRequired,
  until: PropTypes.number.isRequired,
}

const mapStateToProps = ({ agencies, filters, summaries }) => ({
  agency: getAgency(agencies, filters.place),
  ...filters,
  summary: summaries,
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(
  AgencyChartContainer,
)
