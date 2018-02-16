import { get } from '../http'
import { API } from './constants'

const getNationalPoliceEmployment = params => get(`${API}/police-employment/national`, params)
const getRegionalPoliceEmployment = (regionName, params) => get(`${API}/police-employment/regions/${regionName}`, params)
const getStatePoliceEmployment = (stateAbbr, params) => get(`${API}/police-employment/states/${stateAbbr}`, params)
const getAgencyPoliceEmployment = (ori, params) => get(`${API}/police-employment/agencies/${ori}`, params)

export default {
  getNationalPoliceEmployment,
  getRegionalPoliceEmployment,
  getStatePoliceEmployment,
  getAgencyPoliceEmployment
}
