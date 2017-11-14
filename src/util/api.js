/* eslint-disable no-nested-ternary */

import upperFirst from 'lodash.upperfirst'

import { get } from './http'
import { mapToApiOffense } from './offenses'
import { oriToState } from './agencies'
import { slugify } from './text'
import lookupUsa, { nationalKey } from './usa'
import {lookupStateByName,lookupRegionByName} from './location'

export const API = '/api-proxy'

const dimensionEndpoints = {
  ageNum: 'age_num',
  locationName: 'location_name',
  offenseName: 'offense_name',
  raceCode: 'race_code',
  relationship: 'offender_relationship',
  sexCode: 'sex_code',
}

const getAgency = ori => get(`${API}/agencies/${ori}`)

const fetchNibrs = ({ crime, dim, place, placeType, type }) => {
  const loc =
    place === nationalKey
      ? 'national'
      : placeType === 'agency'
        ? `agencies/${place}`
        : `states/${lookupUsa(place).id}`

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
  const { crime, place, placeType } = params

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

  return slices.map(s => fetchNibrs({ ...s, crime, place, placeType }))
}

const fetchResults = (key, path) =>
  get(`${API}/${path}?per_page=200`).then(response => ({
    key,
    results: response.results,
  }))

const fetchArson = place => {
  const url = place
    ? `${API}/arson/states/${lookupUsa(place).id}?per_page=50`
    : `${API}/arson/national?per_page=50`
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

const fetchAggregates = place => {
  const estimatesApi = place
    ? `estimates/states/${lookupUsa(place).id}`
    : 'estimates/national'

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

const getSummaryRequests = ({ crime, place, placeType }) => {
  if (placeType === 'agency') {
    const stateName = slugify(oriToState(place))
    return [
      fetchAgencyAggregates(place, crime),
      fetchAggregates(stateName),
      fetchAggregates(),
    ]
  }

  if (placeType === 'state') {
    return [fetchAggregates(place), fetchAggregates()]
  } else if (placeType === 'region') {
  }

  return [fetchAggregates()]
}

const getUcrParticipation = (place, placeType) => {
  let path

  if(place === nationalKey){
    path = 'participation/national';
  } else if (placeType === 'state'){
    path = `participation/states/${place}`
  } else if (placeType === 'region'){
    path = `participation/regions/${place}`
  }

  return get(`${API}/${path}`).then(response => ({
    place,
    results: response.results,
  }))
}

const getUcrParticipationRequests = (filters, region, states) => {
  const { place, placeType } = filters
  let requestPlace
  if (placeType === 'state'){
    requestPlace = lookupStateByName(states.states,place).state_abbr;
  } else if (placeType === 'region') {
    requestPlace = lookupRegionByName(region.regions, place).region_code;
  }
  const requests = [getUcrParticipation(requestPlace,placeType)]

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

export default {
  fetchAggregates,
  fetchAgencyAggregates,
  getAgency,
  fetchNibrs,
  getNibrsRequests,
  getSummaryRequests,
  getUcrParticipation,
  getUcrParticipationRequests,
  getUcrRegions,
  getUcrRegionRequests,
  getUcrStates,
  getUcrStatesRequests,
}
