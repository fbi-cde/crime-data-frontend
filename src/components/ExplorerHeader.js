import startCase from 'lodash.startcase'
import React from 'react'

import { getAgency } from '../util/ori'

const getTitle = ({ agencies, crime, place, placeType }) => {
  if (placeType !== 'agency') return `${startCase(place)} | ${startCase(crime)}`

  const info = getAgency(agencies, place)
  return `${info.agency_name} | ${startCase(crime)}`
}

const ExplorerHeader = params => (
  <div className="items-baseline mt2 mb4">
    <h1 className="flex-auto m0 fs-22 sm-fs-32">{getTitle(params)}</h1>
  </div>
)

export default ExplorerHeader
