import {
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED,
} from '../actions/constants'

const initialState = {
  loading: false,
  data: {},
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
        data: { ...action.summaries },
        loading: false,
      }
    default:
      return state
  }
}
