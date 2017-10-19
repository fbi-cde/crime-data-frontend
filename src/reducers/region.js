import {
  UCR_REGION_FAILED,
  UCR_REGION_FETCHING,
  UCR_REGION_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: {},
  error: null,
  loading: false,
  loaded: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UCR_REGION_FAILED:
      return {
        ...state,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
        loading: false,
      }
    case UCR_REGION_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case UCR_REGION_RECEIVED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data.results,
        },
        loading: false,
        loaded: true,
      }
    default:
      return state
  }
}
