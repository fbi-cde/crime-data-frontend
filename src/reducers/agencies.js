import {
  AGENCIES_FETCHING,
  AGENCIES_RECEIVED,
  AGENCY_FAILED,
  AGENCY_FETCHING,
  AGENCY_RECEIVED,
} from '../actions/constants'
import { oriToState } from '../util/agencies'

const initialState = {
  data: {},
  error: null,
  loading: false,
  loaded: false,
  location: null,
}

const updateData = (agency, data) => {
  const agencyUsState = oriToState(agency.ori)
  return {
    ...data,
    [agencyUsState]: {
      ...data[agencyUsState],
      [agency.ori]: agency,
    },
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENCIES_RECEIVED:
      return {
        ...state,
        data: {
          ...action.agencies.agencies,
        },
        location: action.agencies.location,
        loading: false,
        loaded: true,
      }
    case AGENCY_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      }
    case AGENCY_FETCHING:
    case AGENCIES_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      }
    case AGENCY_RECEIVED:
      return {
        ...state,
        data: action.agencies.agencies,
        location: action.agencies.location,
        loading: false,
        loaded: true,
      }
    default:
      return state
  }
}
