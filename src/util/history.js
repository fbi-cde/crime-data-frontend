/* eslint-disable no-unused-vars */
import { browserHistory } from 'react-router'

import { nationalKey } from './usa'

const createNewPathname = ({ change, params }) => {
  const crime = change.pageType || params.pageType
  const place = change.place || params.place || nationalKey
  const placeType = change.placeType || params.placeType || 'state'

  if (place === nationalKey) return `/explorer/${crime}`
  return `/explorer/${placeType}/${place}/${crime}`
}

const createNewQuery = ({ change, oldQuery }) => {
  const { pageType, place, placeType, ...rest } = change

  return { ...oldQuery, ...rest }
}

export const createNewLocation = ({ change, router }) => {
  const { location, params } = router
  const pathname = createNewPathname({ change, params })
  const query = createNewQuery({ change, oldQuery: location.query })

  return { ...location, query, pathname }
}

export default browserHistory
