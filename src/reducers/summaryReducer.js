import {
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED,
} from '../actions/actionTypes'

const initialState = {
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SUMMARY_FETCHING:
      return {
        ...state,
        loading: true,
      }
    case SUMMARY_RECEIVED:
      return {
        ...state,
        ...action.summaries,
        loading: false,
      }
    default:
      return state
  }
}
