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

const getAgency = ori =>
  get(`${API}/agencies/${ori}`).then(response => ({
    [ori]: response,
  }))

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

const fetchResults = (key, path) =>
  get(`${API}/${path}?per_page=200`).then(response => ({
    key,
    results: response.results,
  }))

const fetchNationalEstimates = () =>
  fetchResults(nationalKey, 'estimates/national')

const fetchStateEstimates = state => {
  const stateFmt = state.length === 2 ? state : lookupUsa(state)
  const path = `estimates/states/${stateFmt.toUpperCase()}`
  return fetchResults(state, path)
}

const fetchAgencyAggregates = (ori, state) => {
  const path = `agencies/count/states/offenses/${state}/${ori}`
  return fetchResults(ori, path)
}

const getSummaryRequests = ({ place, placeType }) => {
  if (placeType === 'agency') {
    const state = place.slice(0, 2)

    return [
      fetchAgencyAggregates(place, state),
      fetchStateEstimates(state),
      fetchNationalEstimates(),
    ]
  }

  if (placeType === 'state') {
    return [fetchStateEstimates(place), fetchNationalEstimates()]
  }

  return [fetchNationalEstimates()]
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
  fetchNationalEstimates,
  fetchStateEstimates,
  fetchAgencyAggregates,
  getAgency,
  getNibrs,
  getNibrsRequests,
  getSummaryRequests,
  getUcrParticipation,
  getUcrParticipationRequests,
}
