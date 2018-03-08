import { SUMMARIZED_FAILED, SUMMARIZED_FETCHING, SUMMARIZED_RECEIVED } from './constants'
import api from '../util/api/summary'
// import { calculateRates, reshapeData } from '../util/summarized'

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

export const fetchSummarized = filters => dispatch => {
  dispatch(fetchingSummarized())
  return api.getAgencySummarized(filters.place, filters.pageType)
    .then(d => ({ data: d.results }))
    .then(summarized => dispatch(receivedSummarized(summarized)))
    .catch(error => dispatch(failedSummarized(error)))
}
