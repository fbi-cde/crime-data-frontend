import {
  FOOTNOTE_FAILED,
  FOOTNOTE_FETCHING,
  FOOTNOTE_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: {},
  error: null,
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FOOTNOTE_FAILED:
      return {
        ...state,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
        loading: false,
      }
    case FOOTNOTE_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case FOOTNOTE_RECEIVED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.footnotes,
        },
        loading: false,
      }
    default:
      return state
  }
}
