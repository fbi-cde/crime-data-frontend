import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

import AgencyChart from './AgencyChart'
import DownloadDataBtn from './DownloadDataBtn'
import Loading from './Loading'
import NoData from './NoData'
import { getAgency } from '../util/ori'

const getContent = ({ crime, place, since, summary, until }) => {
  if (summary.loading) return <Loading />

  const data = summary.data[place]
  if (!data || data.length === 0) return <NoData />

  const fname = `${place}-${crime}-${since}–${until}`
  const dataClean = data
    .filter(d => d.year >= since && d.year <= until)
    .sort((a, b) => a.year - b.year)

  return (
    <div>
      <AgencyChart crime={crime} data={dataClean} since={since} until={until} />
      <DownloadDataBtn
        data={[{ data: dataClean, filename: `${fname}.csv` }]}
        filename={fname}
      />
    </div>
  )
}

const AgencyChartContainer = params => {
  const { agency, crime, since, until } = params
  const content = getContent(params)

  return (
    <div>
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 fs-24 sm-fs-32 sans-serif">
          {startCase(crime)} incidents reported by{' '}
          {agency.display}, {since}-{until}
        </h2>
        {content}
      </div>
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
