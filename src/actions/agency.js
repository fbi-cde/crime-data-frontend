import { AGENCY_FETCHING, AGENCY_RECEIVED } from './constants'
import api from '../util/api'

export const fetchingAgency = () => ({
  type: AGENCY_FETCHING,
})

export const receivedAgency = agency => ({
  type: AGENCY_RECEIVED,
  agency,
})

export const fetchAgency = params => dispatch => {
  dispatch(fetchingAgency())

  return api.getAgency(params.place).then(data => {
    dispatch(receivedAgency(data))
  })
}

