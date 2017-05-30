import startCase from 'lodash.startcase'
import React from 'react'

import { getAgency } from '../util/ori'

const title = (place, crime) => `${startCase(place)} | ${startCase(crime)}`

const Header = ({ text }) => (
  <div className="items-baseline mt2 mb4">
    <h1 className="flex-auto m0 pb-tiny fs-22 sm-fs-32 border-bottom border-blue-lighter">
      {text}
    </h1>
  </div>
)

const ExplorerHeader = ({ agencies, crime, place, placeType }) => {
  if (placeType !== 'agency') {
    return <Header text={title(place, crime)} />
  }

  const agency = getAgency(agencies, place)
  return <Header text={title(agency.agency_name, crime)} />
}

export default ExplorerHeader
