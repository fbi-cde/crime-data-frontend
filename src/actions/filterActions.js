
import history, { createNewLocation } from '../util/history'

import {
  FILTER_RESET,
  FILTERS_UPDATE,
} from './actionTypes'
import { fetchIncidents } from './incidentsActions'

export const resetFilter = ({ id }) => ({
  type: FILTER_RESET,
  id,
})

export const updateFilters = filters => ({
  type: FILTERS_UPDATE,
  filters,
})

export const updateFilterAndUrl = ({ change, location }) => (
  (dispatch, getState) => {
    dispatch(updateFilters(change))
    history.push(createNewLocation({ change, location }))

    // const { filters } = getState()
    // dispatch(fetchIncidents(filters))

    return Promise.resolve()
  }
)
