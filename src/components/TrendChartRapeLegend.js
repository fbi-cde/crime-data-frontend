import React from 'react'

const labels = ['Legacy', 'Revised']
const [w, h] = [23, 15]

const TrendChartRapeLegend = () =>
  <div className="sm-col-right">
    <ul className="m0 p0 fs-10 list-style-none">
      {labels.map(d =>
        <li key={d}>
          <svg className="align-top" width={w} height={h}>
            <line
              y1={h / 2}
              x2={w}
              y2={h / 2}
              stroke="#000"
              strokeWidth="2"
              strokeDasharray={d === 'Revised' ? '5,4' : 'none'}
            />
          </svg>
          <span className="ml1 align-top">
            {d} rape definition
          </span>
        </li>,
      )}
    </ul>
  </div>

export default TrendChartRapeLegend
