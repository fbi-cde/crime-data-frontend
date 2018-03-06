/* eslint-disable no-nested-ternary */

import upperFirst from 'lodash.upperfirst'

import { get } from './http'
import { mapToApiOffense } from './offenses'
import { oriToState } from './agencies'
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
    fetchArson(place, placeId, placeType),
  ]

  return Promise.all(requests).then(parseAggregates)
}

const fetchAgencyAggregates = (ori, crime) => {
  const url = `${API}/agencies/count/${ori}/offenses`
  const params = { explorer_offense: mapToApiOffense(crime), per_page: 200 }
  return get(url, params).then(d => ({ key: ori, results: d.results }))
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

const getUcrParticipation = (place, placeId, placeType) => {
  let path

  if (place === nationalKey) {
    path = 'participation/national';
  } else if (placeType === 'state') {
    path = `participation/states/${placeId}`
  } else if (placeType === 'region') {
    path = `participation/regions/${place}`
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

const fetchNibrsCounts = ({ dim, pageType, place, placeType, type, placeId }) => {
  const loc =
    place === nationalKey
      ? 'national'
      : placeType === 'agency'
        ? `agency/${place}`
        : `states/${placeId}`

  const field = dimensionEndpoints[dim] || dim
  let url
  if (field !== '') { url = `${API}/nibrs/${pageType}/${type}/${loc}/${field}` } else { url = `${API}/nibrs/${pageType}/${type}/${loc}` }


  const params = {
    per_page: 1000,
    aggregate_many: false,
  }

  return get(url, params).then(d => ({
    key: `${type}${upperFirst(dim)}`,
    data: JSON.parse(d.results),
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
    { type: 'victim', dim: 'relationships' },
    { type: 'offense', dim: 'count' },

  ]
  return slices.map(s => fetchNibrsCounts({ ...s, pageType, place, placeType, placeId }))
}

const fetchLeoka = ({ dim, place, placeType, placeId, pageType }) => {
  const loc =
    place === nationalKey
      ? 'national'
      : placeType === 'agency'
        ? `agencies/${place}`
        : `states/${placeId}`

  const url = `${API}/leoka/${pageType}/${dim}/count/${loc}`;

  const params = {
    per_page: 1000,
    aggregate_many: false,
  }

  return get(url, params).then(d => ({
    key: `${pageType}${upperFirst(dim)}`,
    data: d.results,
  }))
}

const getLeokaRequests = params => {
  const { pageType, place, placeType, placeId } = params

  const slices = [
    { dim: 'group' },
    { dim: 'assign-dist' },
    { dim: 'weapon' },
  ]

  if (placeType !== 'agency') {
    slices.push({ dim: 'weapon-group' })
    slices.push({ dim: 'weapon-activity' })
  }
  return slices.map(s => fetchLeoka({ ...s, pageType, place, placeType, placeId }))
}

const getSummarizedRequest = filters => {
  const estimatesApi = `${API}/summarized/agency/${filters.place}/${filters.pageType}`
  const params = {
    per_page: 100,
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
  getPoliceEmploymentRequests,
  getSummaryRequests,
  getUcrParticipation,
  getUcrParticipationRequests,
  getUcrRegions,
  getUcrRegionRequests,
  getUcrStates,
  getUcrStatesRequests,
  getLeokaRequests,
  getSummarizedRequest,
}
