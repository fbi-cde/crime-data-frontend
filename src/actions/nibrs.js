import { NIBRS_FAILED, NIBRS_FETCHING, NIBRS_RECEIVED } from './constants'
import api from '../util/api'

export const fetchingNibrs = () => ({
  type: NIBRS_FETCHING,
})

export const receivedNibrs = data => ({
  type: NIBRS_RECEIVED,
  data,
})

export const failedNibrs = error => ({
  type: NIBRS_FAILED,
  error,
})

export const fetchNibrs = params => dispatch => {
  dispatch(fetchingNibrs())

  const requests = api.getNibrsRequests(params)
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedNibrs(data)))
    .catch(error => dispatch(failedNibrs(error)))
}
