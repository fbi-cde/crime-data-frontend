import axios from 'axios'

import {
  AGENCIES_FETCHING,
  AGENCIES_RECEIVED,
  AGENCY_FAILED,
  AGENCY_FETCHING,
  AGENCY_RECEIVED,
} from './constants'
import api from '../util/api'
import { reshapeData } from '../util/ori'

// fetching individual agency details...

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

// loading subset of data for all agencies...

export const fetchingAgencies = () => ({
  type: AGENCIES_FETCHING,
})

export const receivedAgencies = agencies => ({
  type: AGENCIES_RECEIVED,
  agencies,
})

export const fetchAgencies = () => dispatch => {
  dispatch(fetchingAgencies())

  return axios
    .get('/data/agencies-by-state.json')
    .then(response => reshapeData(response.data))
    .then(agencies => dispatch(receivedAgencies(agencies)))
}
