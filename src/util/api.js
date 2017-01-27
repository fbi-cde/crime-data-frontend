import startCase from 'lodash.startcase'
import upperFirst from 'lodash.upperfirst'

import { get, getAll } from './http'

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
  california: 10,
  arizona: 2,
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

  return get(`${ENDPOINTS.summary}?${qs.join('&')}`).then(d => (
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
