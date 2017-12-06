import { POLICE_EMPLOYMENT_FAILED, POLICE_EMPLOYMENT_FETCHING, POLICE_EMPLOYMENT_RECEIVED } from './constants'
import api from '../util/api'
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

export const fetchPoliceEmployment = params => dispatch => {
  dispatch(fetchingPoliceEmployment())

  const requests = api.getPoliceEmploymentRequests(params)

  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(data => dispatch(receivedPoliceEmployment(data)))
    .catch(error => dispatch(failedPoliceEmployment(error)))
}
