import { SHR_COUNTS_FAILED, SHR_COUNTS_FETCHING, SHR_COUNTS_RECEIVED } from './constants'
import api from '../util/api'

export const failedSHRCounts = error => ({
  type: SHR_COUNTS_FAILED,
  error,
})

export const fetchingSHRCounts = () => ({
  type: SHR_COUNTS_FETCHING,
})

export const receivedSHRCounts = data => ({
  type: SHR_COUNTS_RECEIVED,
  data,
})

export const fetchSHRCounts = params => dispatch => {
  dispatch(fetchingSHRCounts())

  const requests = api.getSHRCountsRequests(params)
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedSHRCounts(data)))
    .catch(error => dispatch(failedSHRCounts(error)))
}
