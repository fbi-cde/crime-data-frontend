import uniqBy from 'lodash.uniqby'
import React from 'react'

import AgencyChart from './AgencyChart'
import Loading from './Loading'
import NoData from './NoData'

const getContent = ({ place, summary }) => {
  if (summary.loading) return <Loading />

  const data = summary.data[place]
  if (!data || data.length === 0) return <NoData />

  const dataClean = uniqBy(data.filter(d => d.year >= 2004), 'year')
  return <AgencyChart data={dataClean} />
}

const AgencyChartContainer = props => {
  const { crime, place } = props
  const content = getContent(props)

  return (
    <div>
      <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
        <h2 className="mt0 mb3 fs-24 sm-fs-32 sans-serif">
          {crime} reported by {place}
        </h2>
        {content}
      </div>
    </div>
  )
}

export default AgencyChartContainer
