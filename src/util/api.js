/* eslint no-console: 0 */
import { get, getAll } from './http'

import getStateAbbrFromName from './usa'

import incidents from '../../data/incidents.json'

const API = '/api'
const ENDPOINTS = {
  incidents: `${API}/incidents`,
  summary: `${API}/incidents/count`,
}

const mapCrimeFilterToApiQuery = crimeFilter => {
  return `Manslaughter by Negligence`
}

const getAllIncidents = params => (
  getAll(ENDPOINTS.incidents, params)
)

const getIncidents = () => (
  Promise.resolve({ results: incidents })
  // get(ENDPOINTS.incidents, params)
)

const getSummary = params => {
  const crime = mapCrimeFilterToApiQuery(params.crime)
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
  console.log('qs', qs)
  return get(`${ENDPOINTS.summary}?${qs.join('&')}`).then(d => {
    console.log('d', d)
    return d.results.map(r => ({
      year: r.year,
      rate: r.actual,
    }))
  })
}

export default { getAllIncidents, getIncidents, getSummary }
