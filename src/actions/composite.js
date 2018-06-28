import { updateFilters } from './filters'
import { fetchPoliceEmployment } from './policeEmployment'

import { fetchNibrsCounts } from '../actions/nibrsCounts'
import { fetchVAW } from '../actions/vaw'

import { fetchSummarized } from '../actions/summarized'
import { fetchSummaries } from '../actions/summary'
import { fetchLeoka } from '../actions/leoka'
import { fetchFootnote } from '../actions/footnote'
import { fetchUcrParticipation } from '../actions/participation'
import { fetchAgencies } from '../actions/agencies'
import history, { createNewLocation } from '../util/history'
import { getPlaceId, validateFilter } from '../util/location'
import offensesUtil from '../util/offenses'
import { shouldFetchNibrs } from '../util/participation'

const fetchData = () => (dispatch, getState) => {
  const { filters, region, states } = getState()
  if (region.loaded && states.loaded) {
    filters.placeId = getPlaceId(filters, region.region, states.states)
    if (
      filters.page === 'crime' &&
      offensesUtil.includes(filters.pageType) &&
      validateFilter(filters, region.regions, states.states)
    ) {

    if (filters.placeType === 'state') {
      dispatch(fetchAgencies(filters.placeId))
    } else if (filters.placeType === 'agency') {
      dispatch(fetchAgencies(filters.place.slice(0, 2).toUpperCase()))
    }

    if (
      offensesUtil.includes(filters.pageType) &&
      validateFilter(filters, region.regions, states.states)
    ) {

    if (
      shouldFetchNibrs(filters, states) &&
      filters.page === 'dataset' &&
      filters.pageType === 'violence-against-women'
    ) {
      console.log('Fetch VAW Data')
      dispatch(fetchVAW(filters))
    }

    if (filters.page === 'dataset' && filters.pageType === 'leoka') {
      // Add validation of leoka type and add a shouldFetch Method
      dispatch(fetchLeoka(filters))
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
