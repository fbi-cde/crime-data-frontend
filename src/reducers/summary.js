import {
  SUMMARY_FAILED,
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: {},
  error: null,
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUMMARY_FAILED:
      return {
        ...state,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
        loading: false,
      }
    case SUMMARY_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case SUMMARY_RECEIVED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.summaries,
        },
        loading: false,
      }
    default:
      return state
  }
}
