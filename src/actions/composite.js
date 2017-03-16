/* eslint-disable import/prefer-default-export */
import { updateFilters } from './filters'
import { fetchNibrs } from './nibrs'
import { fetchSummaries } from '../actions/summary'
import { fetchUcrParticipation } from '../actions/ucr'
import history, { createNewLocation } from '../util/history'
import { shouldFetchUcr, shouldFetchSummaries, shouldFetchNibrs } from '../util/ucr'


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
