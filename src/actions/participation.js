import {
  UCR_PARTICIPATION_FAILED,
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from './constants'
import api from '../util/api/participation'
import { nationalKey } from '../util/api/constants'
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

export const fetchUcrParticipation = filters => dispatch => {
  dispatch(fetchingUcrParticipation())
  const { place, placeType, placeId } = filters
  const fn = r => ({ place, results: r.results })
  const requests = [api.getNationalParticipation().then(fn)]
  if (place !== nationalKey) {
    if (placeType === 'region') {
      requests.push(api.getRegionalParticipation(place).then(fn))
    } else if (placeType === 'state') {
      requests.push(api.getStateParticipation(placeId).then(fn))
    } else if (placeType === 'agency') {
      requests.push(api.getAgencyParticipation(placeId).then(fn))
    }
  }
  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(results => dispatch(receivedUcrParticipation(results)))
    .catch(error => dispatch(failedUcrParticipation(error)))
}
