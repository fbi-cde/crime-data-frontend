/* eslint no-undef: 0 */

import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
  GLOSSARY_SHOW_TERM,
} from '../../src/actions/actionTypes';

import reducer from '../../src/reducers/glossaryReducer';

describe('glossaryReducer', () => {
  it('it should return the initial state', () => {
    const initialState = reducer(undefined, { type: 'fake' })
    expect(initialState.isOpen).toEqual(false)
    expect(initialState.term).toEqual(null)
  })

  describe('GLOSSARY_HIDE action type', () => {
    it('should set isOpen to false', () => {
      const initialState = { isOpen: true }
      const actual = reducer(initialState, { type: GLOSSARY_HIDE })
      expect(actual.isOpen).toEqual(false)
    })
  })

  describe('GLOSSARY_SHOW action type', () => {
    it('should set isOpen to true', () => {
      const initialState = { isOpen: false }
      const actual = reducer(initialState, { type: GLOSSARY_SHOW })
      expect(actual.isOpen).toEqual(true)
    })
  })

  describe('GLOSSARY_SHOW_TERM action type', () => {
    it('should set isOpen to true', () => {
      const initialState = { isOpen: false }
      const action = { term: 'fake', type: GLOSSARY_SHOW_TERM }
      const actual = reducer(initialState, action)
      expect(actual.isOpen).toEqual(true)
    })

    it('should set term to action.term', () => {
      const initialState = { isOpen: false }
      const action = { term: 'fake', type: GLOSSARY_SHOW_TERM }
      const actual = reducer(initialState, action)
      expect(actual.term).toEqual(action.term)
    })
  })
})
