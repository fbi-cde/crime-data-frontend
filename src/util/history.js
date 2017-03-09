import { browserHistory } from 'react-router'

export default browserHistory

const splitPath = path => {
  const split = path.split('/')
  return {
    place: split[2],
    crime: split[3],
  }
}

const createNewPathname = ({ change, oldPath }) => {
  const params = splitPath(oldPath)
  const { crime, place } = change
  return `/explorer/${place || params.place}/${crime || params.crime}`
}

const createNewQuery = ({ change, oldQuery }) => {
  const { crime, place, ...rest } = change /* eslint no-unused-vars: 0 */

  return {
    ...oldQuery,
    ...rest,
  }
}

export const createNewLocation = ({ change, location }) => {
  const pathname = createNewPathname({ change, oldPath: location.pathname })
  const query = createNewQuery({ change, oldQuery: location.query })

  return {
    ...location,
    query,
    pathname,
  }
}
