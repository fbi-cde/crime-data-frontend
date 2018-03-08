import { get } from '../http'
import { API } from './constants'

const getNationalLeoka = (v, params) => get(`${API}/leoka/assault/national/${v}`, params)
const getRegionalLeoka = (regionName, v, params) => get(`${API}/leoka/assault/regions/${regionName}/${v}`, params)
const getStateLeoka = (stateAbbr, v, params) => get(`${API}/leoka/assault/states/${stateAbbr}/${v}`, params)
const getAgencyLeoka = (ori, v, params) => get(`${API}/leoka/assault/agencies/${ori}/${v}`, params)

const nonAgencySlices = [
  { dim: 'group' },
  { dim: 'assign-dist' },
  { dim: 'weapon' },
  { dim: 'weapon-group' },
  { dim: 'weapon-activity' }
]
const agencySlices = [
    { dim: 'assign-dist' },
    { dim: 'weapon' },
    { dim: 'weapon-activity' }
]
const params = { size: 1000, aggregate_many: false }

const getNationalLeokaData = () =>
  nonAgencySlices.map(s => getNationalLeoka(...s, params))
const getRegionalLeokaData = regionName =>
  nonAgencySlices.map(s => getRegionalLeoka(regionName, ...s, params))
const getStateLeokaData = stateAbbr =>
  nonAgencySlices.map(s => getStateLeoka(stateAbbr, ...s, params))
const getAgencyLeokaData = ori =>
  agencySlices.map(s => getAgencyLeoka(ori, ...s, params))

export default {
  getNationalLeokaData,
  getRegionalLeokaData,
  getStateLeokaData,
  getAgencyLeokaData
}
