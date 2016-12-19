import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from './actionTypes'
import api from '../util/api'

export const fetchingIncidents = () => ({
  type: INCIDENTS_FETCHING,
})

export const receivedIncidents = response => ({
  type: INCIDENTS_RECEIVED,
  incidents: response.results,
})

export const fetchIncidents = () => dispatch => {
  dispatch(fetchingIncidents())
  return api.getIncidents().then(res => {
    dispatch(receivedIncidents(res))
  })
}
