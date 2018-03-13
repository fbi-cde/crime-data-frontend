/* eslint-disable no-nested-ternary */

import upperFirst from 'lodash.upperfirst'

import { get } from './http'
import { mapToApiOffense } from './offenses'
import { oriToState } from './agencies'
import { slugify } from './text'
import { nationalKey } from './api/constants'
import agencyApi from './api/agency'
import summaryApi from './api/summary'

export const API = '/api-proxy'

const fetchArson = (place, placeId, placeType) => {
  let url
  if (placeType === 'state') {
    url = `${API}/api/arson/states/${placeId}?size=50`
  } else if (placeType === 'region') {
    url = `${API}/api/arson/regions/${place}?size=50`
  } else {
    url = `${API}/api/arson/national?size=50`
  }

  return get(url).then(({ results }) =>
    results.map(d => ({ year: d.year, arson: d.actual })),
  )
}
const getAgency = ori => get(`${API}/agencies/${ori}`)

const fetchEstimates = (place, placeId, placeType) => {
    let api
    const params = { size: 500 }
    if (placeType === 'state') {
      api = summaryApi.getStateEstimates(placeId, params)
    } else if (placeType === 'region') {
      api = summaryApi.getRegionalEstimates(place, params)
    } else {
      api = summaryApi.getNationalEstimates(params);
    }

    return api.then(r => ({
      key: place || nationalKey,
      results: r.results,
    }))
}

const parseAggregates = ([estimates, arsons]) => ({
  ...estimates,
  results: estimates.results.map(datum => ({
    ...datum,
    arson: (arsons.find(a => a.year === datum.year) || {}).arson,
  })),
})

const fetchAggregates = (place, placeType, placeId) => {
  const requests = [
    fetchEstimates(place, placeId, placeType),
    fetchArson(place, placeId, placeType)
  ]

  return Promise.all(requests).then(parseAggregates)
}

const fetchAgencyAggregates = (ori, crime) => {
  const params = { explorer_offense: mapToApiOffense(crime), size: 200 }
  return agencyApi.getAgencyOffenses(ori, params).then(d => ({ key: ori, results: d.results }))
}

const getSummaryRequests = ({ crime, place, placeType, placeId }) => {
  if (placeType === 'agency') {
    const stateName = slugify(oriToState(place))
    return [
      fetchAgencyAggregates(place, crime),
      fetchAggregates(stateName, placeType, placeId),
      fetchAggregates(),
    ]
  }
  return [fetchAggregates(place, placeType, placeId), fetchAggregates()]
}

export const formatError = error => ({
  code: error.response.status,
  message: error.message,
  url: error.config.url,
})

const fetchNibrsCounts = ({ dim, pageType, place, placeType, type, placeId }) => {
  const loc =
    place === nationalKey
      ? 'national'
      : placeType === 'agency'
        ? `agencies/${place}`
        : `states/${placeId}`

  const url = dim !== '' ? `${API}/api/nibrs/${pageType}/${type}/${loc}/${dim}` : `${API}/api/nibrs/${pageType}/${type}/${loc}`

  const params = {
    size: 100,
    aggregate_many: false,
  }

  return get(url, params).then(d => ({
    key: `${type}${upperFirst(dim)}`,
    data: d,
  }))
}

const getNibrsCountsRequests = params => {
  const { pageType, place, placeType, placeId } = params

  const slices = [
    { type: 'offender', dim: 'count' },
    { type: 'offender', dim: 'age' },
    { type: 'offender', dim: 'sex' },
    { type: 'offender', dim: 'race' },
    { type: 'offender', dim: 'ethnicity' },
    { type: 'victim', dim: 'count' },
    { type: 'victim', dim: 'age' },
    { type: 'victim', dim: 'ethnicity' },
    { type: 'victim', dim: 'race' },
    { type: 'victim', dim: 'sex' },
    { type: 'victim', dim: 'location' },
    { type: 'victim', dim: 'relationship' },
    { type: 'offense', dim: 'count' },

  ]
  return slices.map(s => fetchNibrsCounts({ ...s, pageType, place, placeType, placeId }))
}

const getSummarizedRequest = filters => {
  const estimatesApi = `${API}/summarized/agency/${filters.place}/${filters.pageType}`
  const params = {
    size: 500,
  }
  return get(estimatesApi, params).then(d => ({
    data: d.results,
  }))
}

export default {
  fetchAggregates,
  fetchAgencyAggregates,
  getAgency,
  getNibrsCountsRequests,
  getSummaryRequests,
  getSummarizedRequest,
}
