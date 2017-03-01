import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
  GLOSSARY_SHOW_TERM,
} from '../actions/constants'

const initialState = {
  isOpen: false,
  term: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOSSARY_HIDE:
      return {
        ...state,
        isOpen: false,
      }
    case GLOSSARY_SHOW:
      return {
        ...state,
        isOpen: true,
      }
    case GLOSSARY_SHOW_TERM:
      return {
        ...state,
        isOpen: true,
        term: action.term,
      }
    default:
      return state
  }
}
