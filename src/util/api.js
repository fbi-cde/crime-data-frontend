import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'

import { get } from './http'

import getStateAbbrFromName from './usa'

import { population as pop } from './data'

const API = '/api'

const crimes = {
  'aggravated-assault': 'Assault',
  burglary: 'Burglary',
  larceny: 'Larceny',
  'motor-vehicle-theft': 'Moter vehicle theft',
  murder: 'Manslaughter by Negligence',
  rape: 'Rape',
  robbery: 'Robbery',
}

const getPop = (place = 'National') => pop[startCase(place)]

const mapCrimeFilterToApiQuery = filter => crimes[filter]

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

const getSummary = params => {
  const crime = mapCrimeFilterToApiQuery(params.crime)
  const population = getPop(params.place)
  const timeFrom = parseInt(params.timeFrom, 10)
  const timeTo = parseInt(params.timeTo, 10)
  const perPage = (timeTo - timeFrom) + 1
  const qs = [
    `offense=${crime}`,
    `per_page=${perPage}`,
    `year>=${timeFrom}`,
    `year<=${timeTo}`,
  ]

  if (params.place) qs.push(`state=${getStateAbbrFromName(params.place)}`)

  return get(`${API}/incidents/count?${qs.join('&')}`).then(d => (
    d.results.map(r => ({
      year: r.year,
      count: r.actual,
      rate: (r.actual * 100000) / population,
    }))
  ))
}

export default {
  getSummary,
  getIncidentVictimsLocationName,
  getIncidentOffendersSex,
  getIncidentOffendersRace,
  getIncidentOffendersAge,
  getIncidentVictimsSex,
  getIncidentVictimsRace,
  getIncidentVictimsAge,
  getIncidentVictimsRelationship,
}
