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

const fetchArson = place => {
  const placeFilter = place ? `&state=${lookupUsa(place).toUpperCase()}` : ''
  const url = `${API}/counts?explorer_offense=arson&per_page=100${placeFilter}`
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
    ? `estimates/states/${lookupUsa(place).toUpperCase()}`
    : 'estimates/national'

  const requests = [
    fetchResults(place || nationalKey, estimatesApi),
    fetchArson(place),
  ]

  return Promise.all(requests).then(parseAggregates)
}

const fetchAgencyAggregates = ori => {
  const state = ori.slice(0, 2)
  const path = `agencies/count/states/offenses/${state}/${ori}`
  return fetchResults(ori, path)
}

const getSummaryRequests = ({ place, placeType }) => {
  if (placeType === 'agency') {
    const stateName = lookupUsa(place.slice(0, 2))
    return [
      fetchAgencyAggregates(place),
      fetchAggregates(stateName),
      fetchAggregates(),
    ]
  }

  if (placeType === 'state') {
    return [fetchAggregates(place), fetchAggregates()]
  }

  return [fetchAggregates()]
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
  fetchAggregates,
  fetchAgencyAggregates,
  getAgency,
  getNibrs,
  getNibrsRequests,
  getSummaryRequests,
  getUcrParticipation,
  getUcrParticipationRequests,
}
