import { browserHistory } from 'react-router'

import { nationalKey } from './usa'

const createNewPathname = ({ change, params }) => {
  const crime = change.crime || params.crime
  const place = change.place || params.place || nationalKey

  if (place === nationalKey) return `/explorer/${crime}`
  return `/explorer/state/${place}/${crime}`
}

const createNewQuery = ({ change, oldQuery }) => {
  const { crime, place, ...rest } = change /* eslint no-unused-vars: 0 */

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
