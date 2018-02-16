import { get } from '../http'
import { API } from './constants'

const getNationalParticipation = () => get(`${API}/participation/national`);
const getRegionalParticipation = regionName => get(`${API}/participation/regions/${regionName}`)
const getStateParticipation = stateAbbr => get(`${API}/participation/states/${stateAbbr}`)
// NOT YET IMPLEMENTED
const getAgencyParticipation = ori => get(`${API}/participation/agencies/${ori}`)

export default {
  getNationalParticipation,
  getRegionalParticipation,
  getStateParticipation,
  getAgencyParticipation
}
