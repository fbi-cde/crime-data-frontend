import { SUMMARIZED_FAILED, SUMMARIZED_FETCHING, SUMMARIZED_RECEIVED } from './constants'
import api from '../util/api'

export const failedSummarized = error => ({
  type: SUMMARIZED_FAILED,
  error,
})

export const fetchingSummarized = () => ({
  type: SUMMARIZED_FETCHING,
})

export const receivedSummarized = summarized => ({
  type: SUMMARIZED_RECEIVED,
  summarized,
})

export const fetchSummarized = (filters, states) => dispatch => {
  dispatch(fetchingSummarized())
  const requests = api.getSummarizedRequest(filters, states)
  return requests.then(summarized => dispatch(receivedSummarized(summarized)))
  .catch(error => dispatch(failedSummarized(error)))
}
