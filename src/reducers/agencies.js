import { AGENCY_FETCHING, AGENCY_RECEIVED } from '../actions/constants'

const initialState = {
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENCY_FETCHING:
      return {
        ...state,
        loading: true,
      }
    case AGENCY_RECEIVED:
      return {
        ...state,
        ...action.agency,
        loading: false,
      }
    default:
      return state
  }
}
