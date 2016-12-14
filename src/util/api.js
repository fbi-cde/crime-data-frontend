/* eslint no-console: 0 */
import { get, getAll } from './http'
import handleFilters from './filters'

const API = '/api'
const ENDPOINTS = {
  incidents: `${API}/incidents`,
}

const getAllIncidents = params => {
  const processed = handleFilters(params)
  return getAll(ENDPOINTS.incidents, processed)
}

const getIncidents = params => {
  const processed = handleFilters(params)
  return get(ENDPOINTS.incidents, processed)
}

export default { getAllIncidents, getIncidents }
