import { browserHistory } from 'react-router'

import { nationalKey } from './usa'

const createNewPathname = ({ change, params }) => {
  const { crime, place } = change
  if (place && place !== nationalKey) {
    return `/explorer/state/${place || params.place}/${crime || params.crime}`
  }

  return `/explorer/${crime || params.crime}`
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
