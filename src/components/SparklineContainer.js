import startCase from 'lodash.startcase'
import React from 'react'

import Sparkline from './Sparkline'
import { slugify } from '../util/text'

const SparklineContainer = ({ crime, data, place, since, until, yMax }) => {
  const isNational = place === 'US'
  const exploreUrl = isNational
    ? `/explorer/${crime}`
    : `/explorer/state/${slugify(place)}/${crime}`

  return (
    <div className="p2 bg-blue-lighter flex items-center">
      <div>
        <h4 className="m0 sans-serif fs-14">{startCase(place)}</h4>
        <p className="mb2 fs-14">{startCase(crime)}, {since}-{until}</p>
        <a className="btn btn-sm btn-primary fs-12 regular" href={exploreUrl}>
          Explore {isNational ? 'national' : 'state'} data
        </a>
      </div>
      <div className="flex-auto center">
        <Sparkline data={data} yMax={yMax} />
      </div>
    </div>
  )
}

export default SparklineContainer
