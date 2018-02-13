import {
  POLICE_EMPLOYMENT_FAILED,
  POLICE_EMPLOYMENT_FETCHING,
  POLICE_EMPLOYMENT_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: null,
  error: null,
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POLICE_EMPLOYMENT_FAILED:
      return {
        ...state,
        error: {
          message: action.error.message,
        },
        loading: false,
      }
    case POLICE_EMPLOYMENT_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case POLICE_EMPLOYMENT_RECEIVED:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      }
    default:
      return state
  }
}
