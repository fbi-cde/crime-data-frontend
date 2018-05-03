import {
  COUNTY_DATA_FAILED,
  COUNTY_DATA_FETCHING,
  COUNTY_DATA_RECEIVED
} from './constants'
import api from '../util/api'
import { calculateRates } from '../util/county'

export const failedCounties = error => ({
  type: COUNTY_DATA_FAILED,
  error
})

export const fetchingCounties = () => ({
  type: COUNTY_DATA_FETCHING
})

export const receivedCounties = counties => ({
  type: COUNTY_DATA_RECEIVED,
  counties
})

export const fetchCounties = filters => dispatch => {
  dispatch(fetchingCounties())
  return api
    .fetchCounties(filters.placeId, filters.placeType, filters.pageType)
    .then(d => ({ data: calculateRates(d.results) }))
    .then(summarized => dispatch(receivedCounties(summarized)))
    .catch(error => dispatch(failedCounties(error)))
}
