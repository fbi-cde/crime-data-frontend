import { get } from '../http'
import { API } from './constants'

const getRegions = () => get(`${API}/regions`)
const getStates = params => get(`${API}/states`, params)
// this is the same call that is in ./agencies but here for convenience
const getAgencies = params => get(`${API}/agencies`, params)

export default {
  getRegions,
  getStates,
  getAgencies
}
