import { SIDEBAR_HIDE, SIDEBAR_SHOW } from '../actions/actionTypes'

const initialState = { isOpen: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_HIDE:
      return { ...state, isOpen: false }
    case SIDEBAR_SHOW:
      return { ...state, isOpen: true }
    default:
      return state
  }
}
