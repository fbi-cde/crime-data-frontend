import startCase from 'lodash.startcase'
import React from 'react'

const getTitle = ({ agency, crime, place, placeType }) => {
  const info = agency[place]

  if (placeType !== 'agency') return `${startCase(place)} | ${startCase(crime)}`
  if (agency.loading || !info) return 'Agency loading...'
  return `${info.agency_name} Police Department | ${startCase(crime)}`
}

const ExplorerHeader = params => (
  <div className="items-baseline mt2 mb4">
    <h1 className="flex-auto m0 fs-22 sm-fs-32">{getTitle(params)}</h1>
  </div>
)

export default ExplorerHeader
