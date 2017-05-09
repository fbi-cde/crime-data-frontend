import upperFirst from 'lodash.upperfirst'

import { get } from './http'
import { mapToApiOffense } from './offenses'
import lookupUsa, { nationalKey } from './usa'

const API = '/api'

const dimensionEndpoints = {
  ageNum: 'age_num',
  locationName: 'location_name',
  raceCode: 'race_code',
  relationship: 'offender_relationship',
  sexCode: 'sex_code',
}

const getNibrs = ({ crime, dim, place, type }) => {
  const field = dimensionEndpoints[dim]
  const fieldPath = `${field}/offenses`
  const loc = place === nationalKey
    ? 'national'
    : `states/${lookupUsa(place).toUpperCase()}`

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
  const { crime, place } = params

  const slices = [
    { type: 'offender', dim: 'sexCode' },
    { type: 'offender', dim: 'raceCode' },
    { type: 'offender', dim: 'ageNum' },
    { type: 'offense', dim: 'locationName' },
    { type: 'victim', dim: 'ageNum' },
    { type: 'victim', dim: 'raceCode' },
    { type: 'victim', dim: 'sexCode' },
    { type: 'victim', dim: 'relationship' },
  ]

  return slices.map(s => getNibrs({ ...s, crime, place }))
}

const getSummaryEndpoint = ({ place, placeType }) => {
  if (placeType === 'agency') {
    const state = place.slice(0, 2)
    return `${API}/agencies/count/states/offenses/${state}/${place}`
  }

  return place === nationalKey
    ? `${API}/estimates/national`
    : `${API}/estimates/states/${lookupUsa(place).toUpperCase()}`
}

const getSummary = params => {
  const { place } = params
  const endpoint = getSummaryEndpoint(params)

  return get(`${endpoint}?per_page=200`).then(response => ({
    place,
    results: response.results,
  }))
}

const getSummaryRequests = params => {
  const { place, placeType } = params
  const requests = [getSummary({ place, placeType })]

  // add national summary request (unless you already did)
  if (place !== nationalKey && placeType !== 'agency') {
    requests.push(getSummary({ place: nationalKey }))
  }

  return requests
}

const getUcrParticipation = place => {
  const path = place === nationalKey
    ? 'participation/national'
    : `participation/states/${lookupUsa(place).toUpperCase()}`

  return get(`${API}/${path}`).then(response => ({
    place,
    results: response.results,
  }))
}

const getUcrParticipationRequests = params => {
  const { place } = params

  const requests = [getUcrParticipation(place)]

  // add national request (unless you already did)
  if (place !== nationalKey) {
    requests.push(getUcrParticipation(nationalKey))
  }

  return requests
}

export default {
  getNibrs,
  getNibrsRequests,
  getSummary,
  getSummaryRequests,
  getUcrParticipation,
  getUcrParticipationRequests,
}
