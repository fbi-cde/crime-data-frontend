import upperFirst from 'lodash.upperfirst'

import { get } from './http'
import lookup, { nationalKey } from './usa'
import { mapToApiOffense, mapToApiOffenseParam } from './offenses'
import { slugify } from './text'

const API = '/api'

const dimensionEndpoints = {
  ageNum: 'age_num',
  locationName: 'location_name',
  raceCode: 'race_code',
  relationship: 'offender_relationship',
  sexCode: 'sex_code',
}

const stateCodes = {
  alabama: 2,
  alaska: 1,
  arizona: 5,
  arkansas: 3,
  california: 6,
  colorado: 7,
  connecticut: 8,
  delaware: 11,
  'district-of-columbia': 10,
  florida: 12,
  georgia: 13,
  hawaii: 15,
  idaho: 17,
  illinois: 18,
  indiana: 19,
  iowa: 16,
  kansas: 20,
  kentucky: 21,
  louisiana: 22,
  maine: 25,
  maryland: 24,
  massachusetts: 23,
  michigan: 26,
  minnesota: 27,
  mississippi: 29,
  missouri: 28,
  montana: 30,
  nebraska: 31,
  'new-hampshire': 34,
  'new-jersey': 35,
  'new-mexico': 36,
  'new-york': 38,
  nevada: 37,
  'north-carolina': 32,
  'north-dakota': 33,
  ohio: 39,
  oklahoma: 40,
  oregon: 41,
  pennsylvania: 42,
  'rhode-island': 44,
  'south-carolina': 45,
  'south-dakota': 46,
  tennessee: 47,
  texas: 48,
  utah: 49,
  vermont: 52,
  virginia: 51,
  washington: 53,
  wisconsin: 54,
  'west-virginia': 55,
  wyoming: 56,
}

const getNibrs = ({ crime, dim, place, type }) => {
  const field = dimensionEndpoints[dim]
  const fieldPath = `${field}${dim !== 'locationName' ? '/offenses' : ''}`
  const loc = (place === nationalKey) ? 'national' : `states/${stateCodes[place]}`

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

const buildSummaryQueryString = params => {
  const { crime, place } = params
  const offense = mapToApiOffense(crime)
  const offenseParam = mapToApiOffenseParam(crime)
  const timeFrom = parseInt(params.timeFrom, 10)
  const timeTo = parseInt(params.timeTo, 10)
  const perPage = (timeTo - timeFrom) + 1

  const qs = [
    `${offenseParam}=${offense}`,
    `per_page=${perPage}`,
    `year>=${timeFrom}`,
    `year<=${timeTo}`,
  ]

  if (place && place !== nationalKey) {
    qs.push(`state=${lookup(params.place)}`)
  }

  return qs.join('&')
}

const getSummary = params => {
  const { place } = params
  const endpoint = `${API}/incidents/count`
  const qs = buildSummaryQueryString(params)

  return get(`${endpoint}?${qs}`).then(d => ({
    place,
    results: d.results,
  }))
}

const getSummaryRequests = params => {
  const { crime, place, timeFrom, timeTo } = params

  const requests = [
    getSummary({ crime, place, timeFrom, timeTo }),
  ]

  // add national summary request (unless you already did)
  if (place !== nationalKey) {
    requests.push(getSummary({ crime, place: nationalKey, timeFrom, timeTo }))
  }

  return requests
}

const getUcrParticipation = place => {
  const state = lookup(place).toUpperCase()
  return get(`${API}/geo/states/${state}/participation`).then(results => ({
    place: slugify(place),
    results,
  }))
}

export default {
  getNibrs,
  getNibrsRequests,
  getSummary,
  getSummaryRequests,
  getUcrParticipation,
}
