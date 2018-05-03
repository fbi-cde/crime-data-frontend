import {
  COUNTY_DATA_FAILED,
  COUNTY_DATA_FETCHING,
  COUNTY_DATA_RECEIVED,
} from '../actions/constants'

const initialState = {
  data: {},
  error: null,
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTY_DATA_FAILED:
      return {
        ...state,
        error: {
          code: action.error.response.status,
          message: action.error.message,
          url: action.error.config.url,
        },
        loading: false,
      }
    case COUNTY_DATA_FETCHING:
      return {
        ...state,
        error: null,
        loading: true,
      }
    case COUNTY_DATA_RECEIVED:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.counties,
        },
        loading: false,
      }
    default:
      return state
  }
}
