import {
  UCR_REGION_FAILED,
  UCR_REGION_FETCHING,
  UCR_REGION_RECEIVED,
} from './constants'
import api from '../util/api'

export const failedUcrRegion = error => ({
  type: UCR_REGION_FAILED,
  error,
})

export const fetchingUcrRegion = () => ({
  type: UCR_REGION_FETCHING,
})

export const receivedUcrRegion = data => ({
  type: UCR_REGION_RECEIVED,
  data,
})

export const fetchUcrRegion = () => dispatch => {
  dispatch(fetchingUcrRegion())
  const requests = api.getUcrRegions()

  return Promise.all(requests)
    .then(data => data)
    .then(results => dispatch(receivedUcrRegion(results)))
    .catch(error => dispatch(failedUcrRegion(error)))
}
