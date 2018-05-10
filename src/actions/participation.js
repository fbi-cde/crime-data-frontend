import {
  UCR_PARTICIPATION_FAILED,
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED
} from './constants'
import api from '../util/api/participation'
import { nationalKey } from '../util/api/constants'
import { reshapeData } from '../util/participation'

export const failedUcrParticipation = error => ({
  type: UCR_PARTICIPATION_FAILED,
  error
})

export const fetchingUcrParticipation = () => ({
  type: UCR_PARTICIPATION_FETCHING
})

export const receivedUcrParticipation = results => ({
  type: UCR_PARTICIPATION_RECEIVED,
  results
})

export const fetchUcrParticipation = filters => dispatch => {
  dispatch(fetchingUcrParticipation())
  const params = { size: 100 }

  const { place, placeType, placeId } = filters
  const requests = [
    api
      .getNationalParticipation(params)
      .then(r => ({ place: nationalKey, results: r.results }))
  ]
  if (place !== nationalKey) {
    if (placeType === 'region') {
      requests.push(
        api
          .getRegionalParticipation(place, params)
          .then(r => ({ place, results: r.results }))
      )
    } else if (placeType === 'state') {
      requests.push(
        api
          .getStateParticipation(placeId, params)
          .then(r => ({ place, results: r.results }))
      )
    } else if (placeType === 'agency') {
      requests.push(
        api
          .getAgencyParticipation(placeId, params)
          .then(r => ({ place, results: r.results }))
      )
    }
  }
  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(results => {
      dispatch(receivedUcrParticipation(results))
    })
    .catch(error => dispatch(failedUcrParticipation(error)))
}
