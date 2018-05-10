import { get } from '../http'
import { API } from './constants'

const getNationalParticipation = params =>
  get(`${API}/participation/national`, params)
const getRegionalParticipation = (regionName, params) =>
  get(`${API}/participation/regions/${regionName}`, params)
const getStateParticipation = (stateAbbr, params) =>
  get(`${API}/participation/states/${stateAbbr}`, params)
// NOT YET IMPLEMENTED
const getAgencyParticipation = (ori, params) =>
  get(`${API}/participation/agencies/${ori}`, params)

export default {
  getNationalParticipation,
  getRegionalParticipation,
  getStateParticipation,
  getAgencyParticipation
}
