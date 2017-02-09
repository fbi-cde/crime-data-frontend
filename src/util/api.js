import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'

import { get } from './http'
import lookup, { nationalKey } from './usa'
import { mapToApiOffense, mapToApiOffenseParam } from './offenses'
import { population as pop } from './data'
import { slugify } from './text'

const API = '/api'

const dimensionEndpoints = {
  ageNum: 'age_num',
  locationName: 'location_name',
  raceCode: 'race_code',
  relationship: 'offender_relationship',
  sexCode: 'sex_code',
}

const getPop = place => pop[startCase(place)]

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

const getOffendersDimension = ({ dimension, place }) => {
  const endpoint = dimensionEndpoints[dimension]
  const stateCode = stateCodes[place] || '40'
  return get(`${API}/offenders/count/states/${stateCode}/${endpoint}`, {
    per_page: 50,
    aggregate_many: false,
  }).then(res => ({
    key: `offender${upperFirst(dimension)}`,
    data: res.results,
  }))
}

const getVictimsDimension = ({ dimension, place }) => {
  const endpoint = dimensionEndpoints[dimension]
  const stateCode = stateCodes[place] || '40'
  return get(`${API}/victims/count/states/${stateCode}/${endpoint}`, {
    per_page: 50,
    aggregate_many: false,
  }).then(res => ({
    key: `victim${upperFirst(dimension)}`,
    data: res.results,
  }))
}

const getIncidentOffendersAge = params => (
  getOffendersDimension({ dimension: 'ageNum', ...params })
)

const getIncidentOffendersRace = params => (
  getOffendersDimension({ dimension: 'raceCode', ...params })
)

const getIncidentOffendersSex = params => (
  getOffendersDimension({ dimension: 'sexCode', ...params })
)

const getIncidentVictimsAge = params => (
  getVictimsDimension({ dimension: 'ageNum', ...params })
)

const getIncidentVictimsLocationName = params => (
  getVictimsDimension({ dimension: 'locationName', ...params })
)

const getIncidentVictimsRace = params => (
  getVictimsDimension({ dimension: 'raceCode', ...params })
)

const getIncidentVictimsRelationship = params => (
  getVictimsDimension({ dimension: 'relationship', ...params })
)

const getIncidentVictimsSex = params => (
  getVictimsDimension({ dimension: 'sexCode', ...params })
)

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
  const population = getPop(place)
  const endpoint = `${API}/incidents/count`
  const qs = buildSummaryQueryString(params)

  return get(`${endpoint}?${qs}`).then(d => ({
    place,
    results: d.results.map(r => ({
      year: r.year,
      count: r.actual,
      rate: (r.actual * 100000) / population,
    })),
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
  return get(`${API}/geo/states/${state}`).then(d => {
    const results = { ...d }
    delete results.counties
    return {
      place: slugify(place),
      results,
    }
  })
}

export default {
  getIncidentOffendersAge,
  getIncidentOffendersRace,
  getIncidentOffendersSex,
  getIncidentVictimsAge,
  getIncidentVictimsLocationName,
  getIncidentVictimsRace,
  getIncidentVictimsRelationship,
  getIncidentVictimsSex,
  getSummary,
  getSummaryRequests,
  getUcrParticipation,
}
