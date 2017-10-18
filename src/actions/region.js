import {
  UCR_REGION_FAILED,
  UCR_REGION_FETCHING,
  UCR_REGION_RECEIVED,
} from './constants'
import api from '../util/api'
import reshapeData from '../util/region'

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
  const requests = api.getUcrRegionRequests()
  return Promise.all(requests)
    .then(data => dispatch(receivedUcrRegion(reshapeData(data))))
    .catch(error => dispatch(failedUcrRegion(error)))
}
