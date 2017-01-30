import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from './actionTypes'
import api from '../util/api'

export const fetchingNibrsDimensions = () => ({
  type: INCIDENTS_FETCHING,
})

export const receivedNibrsDimensions = data => ({
  type: INCIDENTS_RECEIVED,
  data,
})

export const fetchNibrsDimensions = params => dispatch => {
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

  dispatch(fetchingNibrsDimensions())

  const reduceData = (accum, next) => ({
    ...accum,
    [next.key]: next.data,
  })

  return Promise.all(requests)
    .then(data => data.reduce(reduceData, {}))
    .then(data => dispatch(receivedNibrsDimensions(data)))
}
