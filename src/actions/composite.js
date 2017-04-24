/* eslint-disable import/prefer-default-export */
import { updateFilters } from './filters'
import { fetchNibrs } from './nibrs'
import { fetchSummaries } from '../actions/summary'
import { fetchUcrParticipation } from '../actions/ucr'
import history, { createNewLocation } from '../util/history'
import {
  shouldFetchUcr,
  shouldFetchSummaries,
  shouldFetchNibrs,
} from '../util/ucr'

const fetchData = () => (dispatch, getState) => {
  const { filters } = getState()

  if (shouldFetchUcr(filters)) dispatch(fetchUcrParticipation(filters))
  if (shouldFetchSummaries(filters)) dispatch(fetchSummaries(filters))
  if (shouldFetchNibrs(filters)) dispatch(fetchNibrs(filters))
}

export const updateApp = (change, router) => dispatch => {
  dispatch(updateFilters(change))

  if (router) {
    history.push(createNewLocation({ change, router }))
  }

  return dispatch(fetchData())
}
