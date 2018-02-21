import { updateFilters } from './filters'
import { fetchAsr } from './asr'
import { fetchNibrsCounts } from '../actions/nibrsCounts'
import { fetchSummaries } from '../actions/summary'
import { fetchUcrParticipation } from '../actions/participation'
import history, { createNewLocation } from '../util/history'
import { getPlaceId } from '../util/location'

import {
  shouldFetchUcr,
  shouldFetchSummaries,
  shouldFetchNibrs,
  shouldFetchAsr,
} from '../util/participation'

const fetchData = () => (dispatch, getState) => {
  const { filters, region, states } = getState()
  if (region.loaded && states.loaded) {
    if (!filters.placeId) {
      filters.placeId = getPlaceId(filters, region.region, states.states);
    }
    if (shouldFetchUcr(filters, region, states)) dispatch(fetchUcrParticipation(filters))
    if (shouldFetchSummaries(filters, region, states)) dispatch(fetchSummaries(filters))
    if (shouldFetchNibrs(filters)) {
      // dispatch(fetchNibrs(filters))
      dispatch(fetchNibrsCounts(filters))
    }
    if (shouldFetchAsr(filters, region, states)) dispatch(fetchAsr(filters))
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
