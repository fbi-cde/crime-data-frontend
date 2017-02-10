import {
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from '../actions/actionTypes'

const initialState = {
  loading: false,
  data: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UCR_PARTICIPATION_FETCHING:
      return {
        ...state,
        loading: true,
      }
    case UCR_PARTICIPATION_RECEIVED:
      return {
        ...state,
        data: {
          ...state.data,
          [action.place]: action.results,
        },
        loading: false,
      }
    default:
      return state
  }
}
