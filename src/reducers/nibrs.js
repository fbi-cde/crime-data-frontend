import {
  NIBRS_FAILED,
  NIBRS_FETCHING,
  NIBRS_RECEIVED,
} from '../actions/constants'


const initialState = {
  loading: false,
  data: null,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NIBRS_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
      }
    case NIBRS_FETCHING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case NIBRS_RECEIVED:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
