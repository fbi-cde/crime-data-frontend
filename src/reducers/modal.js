import { MODAL_HIDE, MODAL_SHOW } from '../actions/constants'


const initialState = { isShown: true }

export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL_HIDE:
      return { ...state, isShown: false }
    case MODAL_SHOW:
      return { ...state, isShown: true }
    default:
      return state
  }
}
