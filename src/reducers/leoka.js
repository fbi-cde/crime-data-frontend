import {
  LEOKA_FAILED,
  LEOKA_FETCHING,
  LEOKA_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: null,
  error: null,
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LEOKA_FAILED:
      return {
        ...state,
        error: {
          message: action.error.message,
        },
        loading: false,
      }
    case LEOKA_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case LEOKA_RECEIVED:
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
