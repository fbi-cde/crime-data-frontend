import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from './actionTypes'
import api from '../util/api'

export const fetchingNibrsDimensions = () => ({
  type: INCIDENTS_FETCHING,
})

export const receivedNibrsDimensions = data => ({
  type: INCIDENTS_RECEIVED,
  data,
})

export const fetchNibrsDimensions = params => dispatch => {
  dispatch(fetchingNibrsDimensions())

  const requests = api.getNibrsRequests(params)
  const reduceData = (accum, next) => ({ ...accum, [next.key]: next.data })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedNibrsDimensions(data)))
}
