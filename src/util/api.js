/* eslint-disable no-nested-ternary */

import upperFirst from 'lodash.upperfirst'

import { get } from './http'
import { mapToApiOffense } from './offenses'
import { newOriToState, newOriToStateAbbr } from './agencies'
import { slugify } from './text'

export const API = '/api-proxy'
export const nationalKey = 'united-states'

const dimensionEndpoints = {
  ageNum: 'age_num',
  locationName: 'location_name',
  offenseName: 'offense_name',
  raceCode: 'race_code',
  relationship: 'offender_relationship',
  sexCode: 'sex_code',
}

const getAgency = ori => get(`${API}/agencies/${ori}`)

const getAgencies = stateAbbr => get(`${API}/new/agencies/state/${stateAbbr}`)

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
    per_page: 50,
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

const fetchResults = (key, path) =>
  get(`${API}/${path}?per_page=500`).then(response => ({
    key,
    results: response.results,
  }))

const parsePoliceEmployment = ([policeEmployment]) => ({
  ...policeEmployment,
  results: policeEmployment.results.map(datum => ({
    ...datum,
  })),
})

const fetchPoliceEmployment = (place, placeType, placeId) => {
  let peApi
  if (placeType === 'state') {
    peApi = `police-employment/state/${placeId}`
  } else if (placeType === 'agency') {
    peApi = `police-employment/agency/${placeId}/${place}`
  } else if (placeType === 'region') {
    peApi = `police-employment/region/${place}`
  } else {
    peApi = 'police-employment'
  }

  const requests = [
    fetchResults(place || nationalKey, peApi),
  ]

  return Promise.all(requests).then(parsePoliceEmployment)
}

const getPoliceEmploymentRequests = filters => [fetchPoliceEmployment(filters.place, filters.placeType, filters.placeId), fetchPoliceEmployment()]

const fetchArson = (place, placeId, placeType) => {
  let url
  if (placeType === 'state') {
    url = `${API}/arson/states/${placeId}?per_page=50`
  } else if (placeType === 'region') {
    url = `${API}/arson/regions/${place}?per_page=50`
  } else {
    url = `${API}/arson/national?per_page=50`
  }


  return get(url).then(({ results }) =>
    results.map(d => ({ year: d.year, arson: d.actual })),
  )
}

const parseAggregates = ([estimates, arsons]) => ({
  ...estimates,
  results: estimates.results.map(datum => ({
    ...datum,
    arson: (arsons.find(a => a.year === datum.year) || {}).arson,
  })),
})

const fetchAggregates = (place, placeType, placeId) => {
  let estimatesApi
  if (placeType === 'state') {
    estimatesApi = `estimates/states/${placeId}`
  } else if (placeType === 'region') {
    estimatesApi = `estimates/regions/${place}`
  } else {
    estimatesApi = 'estimates/national'
  }

  const requests = [
    fetchResults(place || nationalKey, estimatesApi),
    fetchArson(place),
  ]

  return Promise.all(requests).then(parseAggregates)
}

const fetchAgencyAggregates = (ori, crime) => {
  const url = `${API}/agencies/count/${ori}/offenses`
  const params = { explorer_offense: mapToApiOffense(crime), per_page: 200 }
  return get(url, params).then(d => ({ key: ori, results: d.results }))
}

const fetchAgencySummarized = ori => {
  const stateAbbr = newOriToStateAbbr(ori)
  const url = `${API}/summarized/agency/${stateAbbr}/${ori}/`
  const params = { per_page: 200 }
  return get(url, params).then(d => ({ key: ori, results: d.results }))
}

const getSummaryRequests = (filters, states) => {
  if (filters.placeType === 'agency') {
    const stateName = slugify(newOriToState(filters.place, states))
    return [
      fetchAgencyAggregates(filters.place, filters.pageType),
      fetchAggregates(stateName, filters.placeType, filters.placeId),
      fetchAggregates(),
    ]
  }
  return [fetchAggregates(filters.place, filters.placeType, filters.placeId), fetchAggregates()]
}

const parseSummarized = ([summarized]) => ({
  ...summarized,
  results: summarized.results.map(datum => ({
    ...datum,
  })),
})

const fetchSummarized = (place, placeType, placeId) => {
  let estimatesApi
  if (placeType === 'state') {
    estimatesApi = `summarized/state/${placeId}`
  } else if (placeType === 'agency') {
    estimatesApi = `summarized/state/${place}`
  } else if (placeType === 'region') {
    estimatesApi = `summarized/region/${place}`
  } else {
    estimatesApi = 'summarized'
  }

  const requests = [
    fetchResults(place || nationalKey, estimatesApi),
  ]

  return Promise.all(requests).then(parseSummarized)
}

const getSummarizedRequests = (filters, states) => {
  if (filters.placeType === 'agency') {
    const stateAbbr = newOriToStateAbbr(filters.place)
    return [
      fetchAgencySummarized(filters.place, filters.pageType),
      fetchSummarized(stateAbbr, filters.placeType, filters.placeId),
      fetchSummarized(),
    ]
  }
  return [fetchSummarized(filters.place, filters.placeType, filters.placeId), fetchSummarized()]
}

const getUcrParticipation = (place, placeId, placeType) => {
  let path

  if (place === nationalKey) {
    path = 'participation/national';
  } else if (placeType === 'state') {
    path = `participation/states/${placeId}`
  } else if (placeType === 'region') {
    path = `participation/regions/${place}`
  } else if (placeType === 'agency') {
    path = `participation/states/${newOriToStateAbbr(place)}`
  }

  return get(`${API}/${path}`).then(response => ({
    place,
    results: response.results,
  }))
}

const getUcrParticipationRequests = filters => {
  const { place, placeType, placeId } = filters

  const requests = [getUcrParticipation(place, placeId, placeType)]

  // add national request (unless you already did)
  if (place !== nationalKey) {
    requests.push(getUcrParticipation(nationalKey))
  }

  return requests
}


const getUcrRegions = () => {
  const path = 'lookup/region'

  return get(`${API}/${path}`).then(response => ({
    results: response.results,
  }))
}

const getUcrRegionRequests = () => {
  const requests = [];
  requests.push(getUcrRegions())

  return requests
}


const getUcrStates = () => {
  const path = 'lookup/state?per_page=100'

  return get(`${API}/${path}`).then(response => ({
    results: response.results,
  }))
}

const getUcrStatesRequests = () => {
  const requests = [];
  requests.push(getUcrStates())

  return requests
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
  if (field !== '') { url = `${API}/nibrs/${type}/count/${loc}/${field}` } else { url = `${API}/nibrs/${type}/count/${loc}` }


  const params = {
    per_page: 1000,
    aggregate_many: false,
  }

  return get(url, params).then(d => ({
    key: `${type}${upperFirst(dim)}`,
    data: d.results,
  }))
}

const getNibrsCountsRequests = params => {
  const { crime, place, placeType, placeId } = params

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
  return slices.map(s => fetchNibrsCounts({ ...s, crime, place, placeType, placeId }))
}

export default {
  fetchAggregates,
  fetchAgencyAggregates,
  fetchAgencySummarized,
  fetchSummarized,
  fetchNibrs,
  getAgency,
  getAgencies,
  getNibrsRequests,
  getPoliceEmploymentRequests,
  fetchNibrsCounts,
  getNibrsCountsRequests,
  getSummaryRequests,
  getSummarizedRequests,
  getUcrParticipation,
  getUcrParticipationRequests,
  getUcrRegions,
  getUcrRegionRequests,
  getUcrStates,
  getUcrStatesRequests,
}
