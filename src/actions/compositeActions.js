/* eslint-disable import/prefer-default-export */
import { updateFilters } from './filterActions'
import { fetchNibrs } from './nibrsActions'
import { fetchSummaries } from '../actions/summaryActions'
import { fetchUcrParticipation } from '../actions/ucrActions'
import history, { createNewLocation } from '../util/history'

// TODO: add should fetch logic (based on "filters" input)
const shouldFetchUcr = () => true
const shouldFetchSummaries = () => true
const shouldFetchNibrs = () => true

const fetchData = () => (dispatch, getState) => {
  const { filters } = getState()

  if (shouldFetchUcr(filters)) dispatch(fetchUcrParticipation(filters.place))
  if (shouldFetchSummaries(filters)) dispatch(fetchSummaries(filters))
  if (shouldFetchNibrs(filters)) dispatch(fetchNibrs(filters))
}

export const updateApp = (change, location) => dispatch => {
  dispatch(updateFilters(change))

  if (location) {
    history.push(createNewLocation({ change, location }))
  }

  return dispatch(fetchData())
}
