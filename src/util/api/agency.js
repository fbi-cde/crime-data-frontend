
import { get } from '../http'

export const API = '/api-proxy/api'

const getAgencies = () => get(`${API}/agencies`)
const getAgency = ori => get(`${API}/agencies/${ori}`)
const getAgencyOffenses = (ori, params) => get(`${API}/agencies/${ori}/offenses`, params)

export default {
  getAgencies,
  getAgency,
  getAgencyOffenses
}
