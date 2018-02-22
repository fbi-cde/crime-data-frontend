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

const dimensionEndpoints = {
  ageNum: 'age_num',
  locationName: 'location_name',
  offenseName: 'offense_name',
  raceCode: 'race_code',
  relationship: 'offender_relationship',
  sexCode: 'sex_code',
}

const fetchNibrs = ({ crime, dim, place, placeType, type, placeId }) => {
  const loc =
    place === nationalKey
      ? 'national'
      : placeType === 'agency'
        ? `agencies/${place}`
        : `states/${placeId}`

  const field = dimensionEndpoints[dim] || dim
  const fieldPath = dim === 'offenseName' ? field : `${field}/offenses`
  const url = `${API}/${type}s/count/${loc}/${fieldPath}`

  const params = {
    size: 50,
    aggregate_many: false,
    explorer_offense: mapToApiOffense(crime),
  }

  return get(url, params).then(d => ({
    key: `${type}${upperFirst(dim)}`,
    data: d.results,
  }))
}

const getNibrsRequests = params => {
  const { crime, place, placeType, placeId } = params

  const slices = [
    { type: 'offender', dim: 'ageNum' },
    { type: 'offender', dim: 'ethnicity' },
    { type: 'offender', dim: 'raceCode' },
    { type: 'offender', dim: 'sexCode' },
    { type: 'offense', dim: 'locationName' },
    { type: 'offense', dim: 'offenseName' },
    { type: 'victim', dim: 'ageNum' },
    { type: 'victim', dim: 'ethnicity' },
    { type: 'victim', dim: 'raceCode' },
    { type: 'victim', dim: 'sexCode' },
    { type: 'victim', dim: 'relationship' },
  ]

  return slices.map(s => fetchNibrs({ ...s, crime, place, placeType, placeId }))
}

const fetchArson = (place, placeId, placeType) => {
  let api
  const params = { size: 50 }
  if (placeType === 'state') {
    api = summaryApi.getStateArson(placeId, params)
  } else if (placeType === 'region') {
    api = summaryApi.getRegionalArson(place, params)
  } else {
    api = summaryApi.getNationalArson(params);
  }

  return api.then(r => r.results.map(d => ({
     year: d.year, arson: d.actual
   })))
}

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

const fetchNibrsCounts = ({ dim, place, placeType, type, placeId }) => {
  const loc =
    place === nationalKey
      ? 'national'
      : placeType === 'agency'
        ? `agencies/${place}`
        : `states/${placeId}`

  const field = dimensionEndpoints[dim] || dim
  let url
  if (field !== '') { url = `${API}/api/nibrs/${type}/${loc}/${field}` } else { url = `${API}/api/nibrs/${type}/${loc}` }


  const params = {
    size: 1000,
    aggregate_many: false,
  }

  return get(url, params).then(d => ({
    key: `${type}${upperFirst(dim)}`,
    data: d.results,
  }))
}

const getNibrsCountsRequests = params => {
  const { pageType, place, placeType, placeId } = params

  const slices = [
    { type: 'offender', dim: '' },
    { type: 'offender', dim: 'age' },
    { type: 'offender', dim: 'sex' },
    { type: 'offender', dim: 'race' },
    { type: 'offender', dim: 'ethnicity' },
    { type: 'victim', dim: '' },
    { type: 'victim', dim: 'age' },
    { type: 'victim', dim: 'ethnicity' },
    { type: 'victim', dim: 'race' },
    { type: 'victim', dim: 'sex' },
    { type: 'victim', dim: 'location' },
    { type: 'victim', dim: 'relationships' },
    { type: 'offense', dim: '' },

  ]
  return slices.map(s => fetchNibrsCounts({ ...s, pageType, place, placeType, placeId }))
}

const getSummarizedRequest = filters => {
  const estimatesApi = `${API}/summarized/agency/${filters.place}/${filters.pageType}`
  return get(estimatesApi).then(d => ({
    data: d.results,
  }))
}
export default {
  fetchAggregates,
  fetchAgencyAggregates,
  fetchNibrs,
  getNibrsRequests,
  fetchNibrsCounts,
  getNibrsCountsRequests,
  getSummaryRequests,
  getSummarizedRequest,
}
