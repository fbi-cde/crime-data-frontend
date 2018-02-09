import { ASR_FAILED, ASR_FETCHING, ASR_RECEIVED } from './constants'
import api from '../util/api'
import { reshapeData } from '../util/asr'

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

  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(data => dispatch(receivedAsr(data)))
    .catch(error => dispatch(failedAsr(error)))
}
