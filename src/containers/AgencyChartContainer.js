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

const Content = ({ crime, place, since, submitsNibrs, summary, until }) => {
  const { error, loading } = summary

  if (loading) return <Loading />
  if (error) return <ErrorCard error={error} />

  const data = summary.data[place]
  if (!data || data.length === 0) return <NoData />

  const fname = `${place}-${crime}-${since}-${until}`
  const dataClean = data
    .filter(d => d.year >= since && d.year <= until)
    .sort((a, b) => a.year - b.year)

  const hasNoValues =
    dataClean.length ===
    dataClean.filter(d => d.reported === 0 && d.cleared === 0).length

  const noun = submitsNibrs ? 'incidents' : 'offenses'
  const noDataText = `There were no ${lowerCase(
    crime,
  )} ${noun} reported during this time period.`

  return (
    <div>
      {hasNoValues
        ? <NoData text={noDataText} />
        : <div>
            <AgencyChart
              crime={crime}
              data={dataClean}
              since={since}
              submitsNibrs={submitsNibrs}
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

  if (!agency) return null

  const submitsNibrs = agency.nibrs_months_reported === 12
  const noun = submitsNibrs ? 'incidents' : 'offenses'

  return (
    <div className="mb7">
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 fs-24 sm-fs-28 sans-serif">
          {startCase(crime)} {noun} reported by{' '}
          {agency.display}, {since}–{until}
        </h2>
        <Content submitsNibrs={submitsNibrs} {...params} />
      </div>
      {!summary.loading &&
        <div className="fs-12 serif italic">
          No data or low data may be the result of an agency not participating,
          reporting no incidents, changes in reporting, or being “covered by”
          another agency. In addition, classification, organization, and the
          hierarchy of agencies can vary by state. To learn more, please see
          agency-level data in the{' '}
          <a
            className="mr-tiny underline"
            href="https://ucr.fbi.gov/crime-in-the-u.s"
          >
            Crime in the United States publications
          </a>.{' '}
          Source: Reported {submitsNibrs ? nibrsTerm : srsTerm} data from{' '}
          {agency.display}
        </div>}
    </div>
  )
}

AgencyChartContainer.propTypes = {
  agency: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
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
  agency: !agencies.loading && getAgency(agencies, filters.place),
  ...filters,
  summary: summaries,
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(
  AgencyChartContainer,
)
