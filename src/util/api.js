/* eslint no-console: 0 */
import { get, getAll } from './http'

const API = '/api'
const ENDPOINTS = {
  incidents: `${API}/incidents`,
}

const getAllIncidents = params => (
  getAll(ENDPOINTS.incidents, params)
)

const getIncidents = params => (
  get(ENDPOINTS.incidents, params)
)

export default { getAllIncidents, getIncidents }
