import {
  UCR_REGION_FAILED,
  UCR_REGION__FETCHING,
  UCR_REGION__RECEIVED,
} from '../actions/constants'

const initialState = {
  data: {},
  error: null,
  loading: false,
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
    case UCR_REGION__FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case UCR_REGION__RECEIVED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.results,
        },
        loading: false,
      }
    default:
      return state
  }
}
