/* eslint no-console: 0 */
import startCase from 'lodash.startCase'

import { get, getAll } from './http'

import getStateAbbrFromName from './usa'

import { population as pop } from './data'

import incidents from '../../data/incidents.json'

const API = '/api'
const ENDPOINTS = {
  incidents: `${API}/incidents`,
  summary: `${API}/incidents/count`,
}

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

const getAllIncidents = params => (
  getAll(ENDPOINTS.incidents, params)
)

const getIncidents = () => (
  Promise.resolve({ results: incidents })
  // get(ENDPOINTS.incidents, params)
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
    `year>${timeFrom - 1}`,
    `year<${timeTo + 1}`,
  ]

  if (params.place) qs.push(`state=${getStateAbbrFromName(params.place)}`)
  console.log(`${ENDPOINTS.summary}?${qs.join('&')}`)
  return get(`${ENDPOINTS.summary}?${qs.join('&')}`).then(d => {
    return d.results.map(r => ({
      year: r.year,
      count: r.actual,
      rate: (r.actual * 100000) / population,
    }))
  }).then(d => {
    console.log('summary data', d)
    return d
  })
}

export default { getAllIncidents, getIncidents, getSummary }
