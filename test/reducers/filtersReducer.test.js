/* eslint no-undef: 0 */

import {
  FILTER_RESET,
  FILTER_UPDATE,
} from '../../src/actions/actionTypes';

import reducer from '../../src/reducers/filtersReducer';

describe('filtersReducer', () => {
  describe('initial state', () => {
    it('should return empty object', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(initialState).toEqual({})
    })
  })

  describe('FILTER_RESET action type', () => {
    it('should remove the filter', () => {
      const initialState = { filter: true, secondFilter: true }
      const action = { id: 'secondFilter', type: FILTER_RESET }
      const actual = reducer(initialState, action)
      expect(actual.filter).toEqual(true)
      expect(actual.secondFilter).toBeUndefined()
    })
  })

  describe('FILTER_UPDATE action type', () => {
    it('should set the filter\'s value', () => {
      const action = { id: 'filter', value: 'fake', type: FILTER_UPDATE }
      const actual = reducer({}, action)
      expect(actual[action.id]).toEqual(action.value)
    })
  })
})
