import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from '../actions/actionTypes'

const initialState = {
  loading: false,
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCIDENTS_FETCHING:
      return {
        ...state,
        loading: true,
      }
    case INCIDENTS_RECEIVED:
      return {
        ...state,
        data: action.incidents,
        loading: false,
      }
    default:
      return state
  }
}
