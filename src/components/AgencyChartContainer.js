import startCase from 'lodash.startcase'
import uniqBy from 'lodash.uniqby'
import React from 'react'
import { connect } from 'react-redux'

import AgencyChart from './AgencyChart'
import Loading from './Loading'
import NoData from './NoData'
import { getAgency } from '../util/ori'

const getContent = ({ crime, place, summary }) => {
  if (summary.loading) return <Loading />

  const data = summary.data[place]
  if (!data || data.length === 0) return <NoData />

  const dataClean = uniqBy(data.filter(d => d.year >= 2004), 'year')
  return <AgencyChart crime={crime} data={dataClean} />
}

const AgencyChartContainer = ({
  agencies,
  crime,
  place,
  since,
  summary,
  until,
}) => {
  const content = getContent({ crime, place, summary })
  const info = getAgency(agencies, place)

  return (
    <div>
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 fs-24 sm-fs-32 sans-serif">
          {startCase(crime)} incidents reported by the{' '}
          {info.agency_name} [Agency Type], {since}-{until}
        </h2>
        {content}
      </div>
    </div>
  )
}

const mapStateToProps = ({ agencies, filters, summaries }) => ({
  agencies,
  ...filters,
  summary: summaries,
})
const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(
  AgencyChartContainer,
)
