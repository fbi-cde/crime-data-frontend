import {
  AGENCIES_FETCHING,
  AGENCIES_RECEIVED,
  AGENCY_FAILED,
  AGENCY_FETCHING,
  AGENCY_RECEIVED
} from '../actions/constants'
import { oriToState } from '../util/agencies'

const initialState = {
  data: {},
  error: null,
  loading: false,
  loaded: false
}

const updateData = (agency, data) => {
  const agencyUsState = agency.ori.slice(0, 2).toUpperCase()
  return {
    ...data,
    [agencyUsState]: {
      ...data[agencyUsState],
      [agency.ori]: agency
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENCIES_RECEIVED:
      return {
        ...state,
        data: action.agencies,
        loading: false,
        loaded: true
      }
    case AGENCY_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false
      }
    case AGENCY_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: true
      }
    case AGENCIES_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false
      }
    case AGENCY_RECEIVED:
      return {
        ...state,
        data: updateData(action.agency, state.data),
        loading: false,
        loaded: true
      }
    default:
      return state
  }
}
