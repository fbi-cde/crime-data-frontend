
import history, { createNewLocation } from '../util/history'

import {
  FILTER_RESET,
  FILTERS_UPDATE,
} from './actionTypes'
import { fetchIncidents } from './incidentsActions'
import { fetchSummaries } from '../actions/summaryActions'

export const resetFilter = ({ id }) => ({
  type: FILTER_RESET,
  id,
})

export const updateFilters = filters => ({
  type: FILTERS_UPDATE,
  filters,
})

/* eslint arrow-body-style: 0 */

// TODO: maybe this should be in the history module?
// exported as a function such as goToUrl() or such?
const updateUrl = ({ change, location }) => {
  history.push(createNewLocation({ change, location }))
}

// TODO: I think it might make more sense to name async actions
// and action creators differently. Since resetFilter and
// updateFilters actually don't dispatch actions
// perhaps they can be called createUpdateFitlersActions, etc
export const updateFiltersAndUrl = ({ change, location }) => {
  return (dispatch, getState) => {
    dispatch(updateFilters(change))

    const { filters } = getState()
    // TODO we should make sure we have all requisite filters
    // to make as few dispatches as possible
    // each one will trigger a re-render cycle
    if (filters.crime) dispatch(fetchSummaries(filters))
    dispatch(fetchIncidents(filters))

    // TODO we'll have to make a new number of API calls
    // to get the summary data
    // to get the incident details data
    // and likely to get the census data
    // I wonder if we should actually just have one action filters
    // called like apiActions or dataActions that has action creators
    // and a larger action that links all of them together?

    updateUrl({ change, location })

    return Promise.resolve()
  }
}
