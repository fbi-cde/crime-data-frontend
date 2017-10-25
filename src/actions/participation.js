import {
  UCR_PARTICIPATION_FAILED,
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from './constants'
import api from '../util/api'
import { reshapeData } from '../util/participation'

export const failedUcrParticipation = error => ({
  type: UCR_PARTICIPATION_FAILED,
  error,
})

export const fetchingUcrParticipation = () => ({
  type: UCR_PARTICIPATION_FETCHING,
})

export const receivedUcrParticipation = results => ({
  type: UCR_PARTICIPATION_RECEIVED,
  results,
})

export const fetchUcrParticipation = (filters, region, states )=> dispatch => {
  dispatch(fetchingUcrParticipation())
  const requests = api.getUcrParticipationRequests(filters, region, states)
  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(results => dispatch(receivedUcrParticipation(results)))
    .catch(error => dispatch(failedUcrParticipation(error)))
}
