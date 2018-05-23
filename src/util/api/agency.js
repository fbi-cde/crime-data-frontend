
import { get } from '../http'
import { API } from './constants'

const getAgencies = params => get(`${API}/agencies`, params)
const getAgency = ori => get(`${API}/agencies/${ori}`)
const getAgencyOffenses = (ori, params) => get(`${API}/agencies/${ori}/offenses`, params)

export default {
  getAgencies,
  getAgency,
  getAgencyOffenses
}
