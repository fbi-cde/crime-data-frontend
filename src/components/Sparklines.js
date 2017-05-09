import React from 'react'

import { nationalKey } from '../util/usa'

const Sparklines = ({ place, summaries }) => {
  const { data, loading } = summaries
  const state = place.slice(0, 2)

  if (loading || !data) return null

  return (
    <div className="mb4">
      <h3>State and national crime rates</h3>
      <div className="clearfix mxn1 fs-10">
        <div className="sm-col sm-col-6 px1">
          <div className="p2 bg-white">
            <pre>{JSON.stringify(data[state], null, 2)}</pre>
          </div>
        </div>
        <div className="sm-col sm-col-6 px1">
          <div className="p2 bg-white">
            <pre>{JSON.stringify(data[nationalKey], null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sparklines
