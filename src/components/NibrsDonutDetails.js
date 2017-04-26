import { format } from 'd3-format'
import React from 'react'

const fmt = format(',.0f')

const NibrsDonutDetails = ({
  colorMap,
  data,
  hover,
  onMouseOver,
  onMouseOut,
  selected,
}) => (
  <div className="mt2 lg-mt4">
    <span className="mb2 bold caps fs-12 red">Incidents</span>
    <ul className="list-style-none p0 m0 fs-14">
      {data.map((d, i) => {
        const active = d.key === selected
        const border = active
          ? 'border-bottom border-w2'
          : 'border-bottom-dashed'
        const opacity = hover === null || active ? 1 : 0.5
        return (
          <li
            key={i}
            className={`mb1 flex items-baseline ${border} cursor-pointer`}
            onMouseOver={onMouseOver(d.key)}
            onMouseOut={onMouseOut}
          >
            <span
              className="mr1"
              style={{
                width: 10,
                height: 10,
                backgroundColor: colorMap(d.key),
                opacity,
              }}
            />
            <div
              className={`flex flex-auto justify-between ${active && 'bold'}`}
            >
              <span>{d.key}</span>
              <span className="monospace">{fmt(d.count)}</span>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
)

export default NibrsDonutDetails
