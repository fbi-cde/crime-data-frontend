/* eslint no-unused-vars: 0 */
import { browserHistory } from 'react-router'

import { nationalKey } from './usa'

const createNewPathname = ({ change, params }) => {
  const crime = change.crime || params.crime
  const place = change.place || params.place || nationalKey
  const placeType = change.placeType || params.placeType

  if (place === nationalKey) return `/explorer/${crime}`
  return `/explorer/${placeType}/${place}/${crime}`
}

const createNewQuery = ({ change, oldQuery }) => {
  const { crime, place, placeType, ...rest } = change

  return {
    ...oldQuery,
    ...rest,
  }
}

export const createNewLocation = ({ change, router }) => {
  const { location, params } = router

  const pathname = createNewPathname({ change, params })
  const query = createNewQuery({ change, oldQuery: location.query })

  return {
    ...location,
    query,
    pathname,
  }
}

export default browserHistory
