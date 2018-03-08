import { LEOKA_FAILED, LEOKA_FETCHING, LEOKA_RECEIVED } from './constants'
import api from '../util/api/leoka'
import { nationalKey } from '../util/api/constants'

export const failedLeoka = error => ({
  type: LEOKA_FAILED,
  error,
})

export const fetchingLeoka = () => ({
  type: LEOKA_FETCHING,
})

export const receivedLeoka = data => ({
  type: LEOKA_RECEIVED,
  data,
})

export const fetchLeoka = params => dispatch => {
  dispatch(fetchingLeoka())

  const { placeType, place, placeId } = params

  const requests = [api.getNationalLeokaData()
    .map(p => p.then(r => ({ key: nationalKey, results: r.results })))]
  if (place !== nationalKey) {
      if (placeType === 'region') {
        requests.push(api.getRegionalLeokaData(place)
          .map(p => p.then(r => ({ key: place, results: r.results }))))
      } else if (placeType === 'state') {
        requests.push(api.getStateLeokaData(placeId)
          .map(p => p.then(r => ({ key: place, results: r.results }))))
      } else if (placeType === 'agency') {
        requests.push(api.getAgencyLeokaData(placeId)
          .map(p => p.then(r => ({ key: place, results: r.results }))))
      }
  }
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedLeoka(data)))
    .catch(error => dispatch(failedLeoka(error)))
}
