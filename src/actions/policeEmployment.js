import {
  POLICE_EMPLOYMENT_FAILED,
  POLICE_EMPLOYMENT_FETCHING,
  POLICE_EMPLOYMENT_RECEIVED
} from './constants'
import api from '../util/api/policeEmployment'
import { nationalKey } from '../util/api/constants'
import { reshapeData } from '../util/policeEmployment'

export const failedPoliceEmployment = error => ({
  type: POLICE_EMPLOYMENT_FAILED,
  error,
})

export const fetchingPoliceEmployment = () => ({
  type: POLICE_EMPLOYMENT_FETCHING,
})

export const receivedPoliceEmployment = data => ({
  type: POLICE_EMPLOYMENT_RECEIVED,
  data,
})

export const fetchPoliceEmployment = filters => dispatch => {
  dispatch(fetchingPoliceEmployment())

  const { place, placeType, placeId } = filters
  const requests = [api.getNationalPoliceEmployment()
    .then(r => ({ key: nationalKey, results: r.results }))]
  if (place !== nationalKey) {
    if (placeType === 'region') {
      requests.push(api.getRegionalPoliceEmployment(place)
        .then(r => ({ key: place, results: r.results })))
    } else if (placeType === 'state') {
      requests.push(api.getStatePoliceEmployment(placeId)
        .then(r => ({ key: place, results: r.results })))
    } else if (placeType === 'agency') {
      requests.push(api.getAgencyPoliceEmployment(place)
        .then(r => ({ key: place, results: r.results })))
    }
  }

  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(data => dispatch(receivedPoliceEmployment(data)))
    .catch(error => dispatch(failedPoliceEmployment(error)))
}
