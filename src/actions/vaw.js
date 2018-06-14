import { VAW_FAILED, VAW_FETCHING, VAW_RECEIVED } from './constants'
import api from '../util/api'

export const failedVAW = error => ({
  type: VAW_FAILED,
  error
})

export const fetchingVAW = () => ({
  type: VAW_FETCHING
})

export const receivedVAW = data => ({
  type: VAW_RECEIVED,
  data
})

export const fetchVAW = params => dispatch => {
  dispatch(fetchingVAW())

  const requests = api.getVAWRequests(params)
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })
  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedVAW(data)))
    .catch(error => dispatch(failedVAW(error)))
}
