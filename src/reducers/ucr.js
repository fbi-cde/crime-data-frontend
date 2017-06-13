import {
  UCR_PARTICIPATION_FAILURE,
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
    case UCR_PARTICIPATION_FAILURE:
      return {
        ...state,
        error: action.error,
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
