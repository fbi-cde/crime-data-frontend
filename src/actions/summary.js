import { SUMMARY_FETCHING, SUMMARY_RECEIVED } from './constants'
import api from '../util/api'

export const fetchingSummary = () => ({
  type: SUMMARY_FETCHING,
})

export const receivedSummary = summaries => ({
  type: SUMMARY_RECEIVED,
  summaries,
})

export const fetchSummaries = params => dispatch => {
  dispatch(fetchingSummary())

  const requests = api.getSummaryRequests(params)

  return Promise.all(requests).then(data => {
    const summaries = Object.assign(...data.map(d => ({ [d.key]: d.results })))
    dispatch(receivedSummary(summaries))
  })
}
