
import { get } from '../http'

export const API = '/api-proxy/api'

const getAgencies = () => get(`${API}/agencies`)
const getAgency = ori => get(`${API}/agencies/${ori}`)

export default {
  getAgency,
  getAgencies
}
