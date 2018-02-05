import { LEOKA_FAILED, LEOKA_FETCHING, LEOKA_RECEIVED } from './constants'
import api from '../util/api'

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

  const requests = api.getLeokaRequests(params)
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedLeoka(data)))
    .catch(error => dispatch(failedLeoka(error)))
}
