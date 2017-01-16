
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

const updateUrl = ({ change, location }) => {
  history.push(createNewLocation({ change, location }))
}

export const updateFiltersAndUrl = ({ change, location }) => {
  return (dispatch, getState) => {
    dispatch(updateFilters(change))

    const { filters } = getState()
    if (filters.crime) dispatch(fetchSummaries(filters))
    dispatch(fetchIncidents(filters))

    updateUrl({ change, location })

    return Promise.resolve()
  }
}
