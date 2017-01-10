import {
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED,
} from './actionTypes'
import api from '../util/api'

export const fetchingSummary = () => ({
  type: SUMMARY_FETCHING,
})

export const receivedSummary = summaries => ({
  type: SUMMARY_RECEIVED,
  summaries,
})

// TODO: rename this. fetchSummaries isn't very descriptive
// but something like fetchPlaceAndNationalSummaries is too long
export const fetchSummaries = params => dispatch => {
  const { crime, place } = params
  dispatch(fetchingSummary())

  const nationalSummary = api.getSummary({ crime })
  const placeSummary = api.getSummary({ crime, place })

  return Promise.all([nationalSummary, placeSummary]).then(data => {
    const summaries = {
      national: data[0],
      [place]: data[1],
    }
    console.log('summaries', summaries)
    dispatch(receivedSummary(summaries))
  })
}
