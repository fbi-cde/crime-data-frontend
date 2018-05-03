import { get } from '../http'
import { API } from './constants'

// const getNationalFootnote = params => get(`${API}/footnotes/national`, params)
// const getRegionalFootnote = (regionName, params) => get(`${API}/footnotes/regions/${regionName}`, params)
// const getStateFootnote = (stateAbbr, params) => get(`${API}/footnotes/states/${stateAbbr}`, params)
const getCountyData = (stateAbbr, offense) => get(`${API}/counties/${stateAbbr}/${offense}`)

export default {
  // getNationalFootnote,
  // getRegionalFootnote,
  // getStateFootnote,
  getCountyData
}
