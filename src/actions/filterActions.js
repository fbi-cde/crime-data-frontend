
import history, { createNewLocation } from '../util/history'

import {
  FILTER_RESET,
  FILTERS_UPDATE,
} from './actionTypes'
import { fetchNibrsDimensions } from './nibrsActions'
import { fetchSummaries } from '../actions/summaryActions'
import { fetchUcrParticipation } from '../actions/ucrActions'

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
    dispatch(fetchUcrParticipation(filters.place))
    if (filters.crime) dispatch(fetchSummaries(filters))
    dispatch(fetchNibrsDimensions(filters))

    updateUrl({ change, location })

    return Promise.resolve()
  }
}
