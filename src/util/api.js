/* eslint no-console: 0 */
import { get, getAll } from './http'

import incidents from '../../data/incidents.json'
import nationalSummary from '../../data/national-summary.json'
import stateSummary from '../../data/state-summary.json'

const API = '/api'
const ENDPOINTS = {
  incidents: `${API}/incidents`,
}

const getAllIncidents = params => (
  getAll(ENDPOINTS.incidents, params)
)

const getIncidents = params => (
  Promise.resolve({ results: incidents })
  // get(ENDPOINTS.incidents, params)
)

const getSummary = params => {
  if (params.place) return Promise.resolve(stateSummary)
  return Promise.resolve(nationalSummary)
}

export default { getAllIncidents, getIncidents, getSummary }
