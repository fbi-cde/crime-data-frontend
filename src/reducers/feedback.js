import { FEEDBACK_HIDE, FEEDBACK_SHOW } from '../actions/constants'


const initialState = { isOpen: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_HIDE:
      return { ...state, isOpen: false }
    case FEEDBACK_SHOW:
      return { ...state, isOpen: true }
    default:
      return state
  }
}
