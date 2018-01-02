import { updateFilters } from './filters'
import { fetchNibrs } from './nibrs'
import { fetchPoliceEmployment } from './policeEmployment'
import { fetchSummaries } from '../actions/summary'
import { fetchSummarized } from '../actions/summarized'
import { fetchUcrParticipation } from '../actions/participation'
import { fetchAgencies } from '../actions/agencies'
import history, { createNewLocation } from '../util/history'
import { getPlaceId, validateFilter } from '../util/location'
import { shouldFetchAgencies } from '../util/agencies'
import offensesUtil from '../util/offenses'

import {
  shouldFetchNibrs,
} from '../util/participation'

const fetchData = () => (dispatch, getState) => {
  const { filters, region, states, agencies } = getState()
  if (region.loaded && states.loaded) {
    if (!filters.placeId) {
      filters.placeId = getPlaceId(filters, region.region, states.states);
    }
    if (offensesUtil.includes(filters.pageType) && validateFilter(filters, region.regions, states.states)) {
      if (shouldFetchAgencies(filters) && agencies.locations !== filters.place && filters.placeType !== 'agency') dispatch(fetchAgencies(filters))
      if (filters.placeType !== 'agency')dispatch(fetchUcrParticipation(filters))
      dispatch(fetchSummaries(filters, states))
      dispatch(fetchSummarized(filters, states))
      dispatch(fetchPoliceEmployment(filters))

      if (shouldFetchNibrs(filters, states)) dispatch(fetchNibrs(filters))
    }
  }
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
