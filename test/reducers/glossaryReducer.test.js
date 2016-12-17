/* eslint no-undef: 0 */

import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
} from '../../src/actions/actionTypes';

import reducer from '../../src/reducers/glossaryReducer';

describe('glossaryReducer', () => {
  describe('initial state', () => {
    it('should return isVisible: false', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(initialState.isVisible).toEqual(false)
    })
  })

  describe('GLOSSARY_HIDE action type', () => {
    it('should set isVisible to false', () => {
      const initialState = { isVisible: true }
      const actual = reducer(initialState, { type: GLOSSARY_HIDE })
      expect(actual.isVisible).toEqual(false)
    })
  })

  describe('GLOSSARY_SHOW action type', () => {
    it('should set isVisible to true', () => {
      const initialState = { isVisible: false }
      const actual = reducer(initialState, { type: GLOSSARY_SHOW })
      expect(actual.isVisible).toEqual(true)
    })
  })
})
