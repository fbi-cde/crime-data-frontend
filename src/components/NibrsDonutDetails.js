import { format } from 'd3-format'
import React from 'react'

const fmt = format(',.0f')

const NibrsDonutDetails = ({ colorMap, data, selected }) => (
  <div className='mt2 lg-mt4'>
    <span className='mb2 bold caps fs-12 red'>Incidents</span>
    <ul className='list-style-none p0 m0 fs-14'>
      {data.map((d, i) => {
        const active = i === selected
        const border = active ? 'border-bottom' : 'border-bottom-dashed'
        return (
          <li
            key={i}
            className={`mb1 flex items-baseline ${border}`}
          >
            <span
              className='mr1'
              style={{ width: 10, height: 10, backgroundColor: colorMap(i) }}
            />
            <div className={`flex flex-auto justify-between ${active && 'bold'}`}>
              <span>{d.key}</span>
              <span className='monospace'>{fmt(d.count)}</span>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
)

export default NibrsDonutDetails
