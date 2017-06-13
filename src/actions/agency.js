import { AGENCY_FAILED, AGENCY_FETCHING, AGENCY_RECEIVED } from './constants'
import api from '../util/api'

export const failedAgency = error => ({
  type: AGENCY_FAILED,
  error,
})

export const fetchingAgency = () => ({
  type: AGENCY_FETCHING,
})

export const receivedAgency = agency => ({
  type: AGENCY_RECEIVED,
  agency,
})

export const fetchAgency = params => dispatch => {
  dispatch(fetchingAgency())

  return api
    .getAgency(params.place)
    .then(agency => dispatch(receivedAgency(agency)))
    .catch(error => dispatch(failedAgency(error)))
}
