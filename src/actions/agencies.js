import axios from 'axios'

import {
  AGENCIES_FETCHING,
  AGENCIES_RECEIVED,
  AGENCY_FAILED,
  AGENCY_FETCHING,
  AGENCY_RECEIVED,
} from './constants'
import api, { formatError } from '../util/api'

// fetching individual agency details...

export const failedAgency = error => ({
  type: AGENCY_FAILED,
  error: formatError(error),
})

export const fetchingAgency = () => ({
  type: AGENCY_FETCHING,
})

export const receivedAgency = (agency, location) => ({
  type: AGENCY_RECEIVED,
  agency,
  location,
})

export const fetchAgency = params => dispatch => {
  dispatch(fetchingAgency())

  return api
    .getAgency(params.place)
    .then(agency => dispatch(receivedAgency(agency)))
    .catch(error => dispatch(failedAgency(error)))
}


// loading subset of data for all agencies...
export const fetchingAgencies = () => ({
  type: AGENCIES_FETCHING,
})

export const receivedAgencies = (agencies, location) => ({
  type: AGENCIES_RECEIVED,
  agencies,
  location,
})

export const fetchAgencies = filters => dispatch => {
  dispatch(fetchingAgencies())
  // Look up Agency State?

  return api.getAgencies(filters.placeId)
    .then(response => receivedAgencies(response, filters.place))
    .then(agencies => dispatch(receivedAgencies(agencies, filters.place)))
}
