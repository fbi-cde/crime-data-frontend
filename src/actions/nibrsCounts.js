import { NIBRS_COUNTS_FAILED, NIBRS_COUNTS_FETCHING, NIBRS_COUNTS_RECEIVED } from './constants'
import api from '../util/api'

export const failedNibrsCounts = error => ({
  type: NIBRS_COUNTS_FAILED,
  error,
})

export const fetchingNibrsCounts = () => ({
  type: NIBRS_COUNTS_FETCHING,
})

export const receivedNibrsCounts = data => ({
  type: NIBRS_COUNTS_RECEIVED,
  data,
})

export const fetchNibrsCounts = params => dispatch => {
  dispatch(fetchingNibrsCounts())

  const requests = api.getNibrsCountsRequests(params)
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })
  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedNibrsCounts(data)))
    .catch(error => dispatch(failedNibrsCounts(error)))
}
