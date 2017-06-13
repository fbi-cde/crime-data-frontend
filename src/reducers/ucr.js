import {
  UCR_PARTICIPATION_FAILED,
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: {},
  error: null,
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UCR_PARTICIPATION_FAILED:
      return {
        ...state,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
        loading: false,
      }
    case UCR_PARTICIPATION_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case UCR_PARTICIPATION_RECEIVED:
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
