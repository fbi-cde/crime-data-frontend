import { get } from '../http'
import { API } from './constants'

const getNationalEstimates = params => get(`${API}/estimates/national`, params)
const getRegionalEstimates = (regionName, params) => get(`${API}/estimates/regions/${regionName}`, params)
const getStateEstimates = (stateAbbr, params) => get(`${API}/estimates/states/${stateAbbr}`, params)

const getNationalArson = params => get(`${API}/arson/national`, params)
const getRegionalArson = (regionName, params) => get(`${API}/arson/regions/${regionName}`, params)
const getStateArson = (stateAbbr, params) => get(`${API}/arson/states/${stateAbbr}`, params)

export default {
  getNationalEstimates,
  getRegionalEstimates,
  getStateEstimates,
  getNationalArson,
  getRegionalArson,
  getStateArson
}
