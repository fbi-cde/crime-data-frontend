import {
  NIBRS_COUNTS_FAILED,
  NIBRS_COUNTS_FETCHING,
  NIBRS_COUNTS_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: null,
  error: null,
  loading: false,
  loaded: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NIBRS_COUNTS_FAILED:
      return {
        ...state,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
        loading: false,
        loaded: false,
      }
    case NIBRS_COUNTS_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      }
    case NIBRS_COUNTS_RECEIVED:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        loaded: true,
      }
    default:
      return state
  }
}
