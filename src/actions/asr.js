import { ASR_FAILED, ASR_FETCHING, ASR_RECEIVED } from './constants'
import api from '../util/api'

export const failedAsr = error => ({
  type: ASR_FAILED,
  error,
})

export const fetchingAsr = () => ({
  type: ASR_FETCHING,
})

export const receivedAsr = data => ({
  type: ASR_RECEIVED,
  data,
})

export const fetchAsr = params => dispatch => {
  dispatch(fetchingAsr())

  const requests = api.getAsrRequests(params)
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedAsr(data)))
    .catch(error => dispatch(failedAsr(error)))
}
