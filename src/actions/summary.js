import { SUMMARY_FAILED, SUMMARY_FETCHING, SUMMARY_RECEIVED } from './constants'
import api from '../util/api'
import { calculateRates, reshapeData } from '../util/summary'

export const failedSummary = error => ({
  type: SUMMARY_FAILED,
  error,
})

export const fetchingSummary = () => ({
  type: SUMMARY_FETCHING,
})

export const receivedSummary = summaries => ({
  type: SUMMARY_RECEIVED,
  summaries,
})

export const fetchSummaries = (filters, states) => dispatch => {
  dispatch(fetchingSummary())
  const requests = api.getSummaryRequests(filters, states)
  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(d => calculateRates(d, filters.placeType))
    .then(summaries => dispatch(receivedSummary(summaries, filters)))
    .catch(error => dispatch(failedSummary(error)))
}
