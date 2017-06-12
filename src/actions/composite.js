/* eslint-disable import/prefer-default-export */
import { updateFilters } from './filters'
import { fetchNibrs } from './nibrs'
import { fetchAgency } from '../actions/agency'
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
  const { placeType } = filters

  if (placeType === 'agency') dispatch(fetchAgency(filters))
  if (shouldFetchUcr(filters)) dispatch(fetchUcrParticipation(filters))
  if (shouldFetchSummaries(filters)) dispatch(fetchSummaries(filters))
  if (shouldFetchNibrs(filters)) dispatch(fetchNibrs(filters))
}

export const updateApp = (change, router) => dispatch => {
  dispatch(updateFilters(change))

  if (router) {
    const loc = createNewLocation({ change, router })
    if (window.caches) {
      caches
        .open('crime-data-explorer')
        .then(cache => cache.addAll([loc.pathname]))
    }
    history.push(loc)
  }

  return dispatch(fetchData())
}
