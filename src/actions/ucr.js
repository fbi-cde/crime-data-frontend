import {
  UCR_PARTICIPATION_FAILURE,
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from './constants'
import api from '../util/api'
import { reshapeData } from '../util/ucr'

export const fetchingUcrParticipation = () => ({
  type: UCR_PARTICIPATION_FETCHING,
})

export const receivedUcrParticipation = results => ({
  type: UCR_PARTICIPATION_RECEIVED,
  results,
})

export const failedUcrParticipation = error => ({
  type: UCR_PARTICIPATION_FAILURE,
  error,
})

export const fetchUcrParticipation = params => dispatch => {
  dispatch(fetchingUcrParticipation())
  const requests = api.getUcrParticipationRequests(params)
  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(results => dispatch(receivedUcrParticipation(results)))
    .catch(err => dispatch(failedUcrParticipation(err.response)))
}
