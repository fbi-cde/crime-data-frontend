import { VAW_FAILED, VAW_FETCHING, VAW_RECEIVED } from '../actions/constants'

const initialState = {
  data: null,
  error: null,
  loading: false,
  loaded: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case VAW_FAILED:
      return {
        ...state,
        error: {
          message: action.error.message
        },
        loading: false,
        loaded: false
      }
    case VAW_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false
      }
    case VAW_RECEIVED:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        loaded: true
      }
    default:
      return state
  }
}
