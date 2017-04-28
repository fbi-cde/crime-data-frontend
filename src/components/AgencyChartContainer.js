import React from 'react'

import AgencyChart from './AgencyChart'

const AgencyChartContainer = () => (
  <div>
    <div className="mb2 p2 sm-p4 bg-white border-top border-blue border-w8">
      <h2 className="mt0 mb3 fs-24 sm-fs-32 sans-serif">
        Murder reported by Hoover Police Department, 2004—2014
      </h2>
      <AgencyChart />
    </div>
  </div>
)

export default AgencyChartContainer
