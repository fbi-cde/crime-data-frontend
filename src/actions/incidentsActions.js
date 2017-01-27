import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from './actionTypes'
import api from '../util/api'

export const fetchingIncidents = () => ({
  type: INCIDENTS_FETCHING,
})

export const receivedIncidents = data => ({
  type: INCIDENTS_RECEIVED,
  data,
})

export const fetchIncidentDimensions = params => dispatch => {
  const { place } = params
  const requests = [
    api.getIncidentOffendersSex,
    api.getIncidentOffendersRace,
    api.getIncidentOffendersAge,
    api.getIncidentVictimsAge,
    api.getIncidentVictimsLocationName,
    api.getIncidentVictimsRace,
    api.getIncidentVictimsSex,
    api.getIncidentVictimsRelationship,
  ].map(f => f({ place }))

  dispatch(fetchingIncidents())

  const reduceData = (accum, next) => ({
    ...accum,
    [next.key]: next.data,
  })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedIncidents(data)))
}
