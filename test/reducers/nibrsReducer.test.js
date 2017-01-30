/* eslint no-undef: 0 */

import {
  INCIDENTS_FETCHING,
  INCIDENTS_RECEIVED,
} from '../../src/actions/actionTypes'

import reducer from '../../src/reducers/nibrsReducer'

describe('nibrsReducer', () => {
  describe('initial state', () => {
    it('should return loading: false and data: []', () => {
      const expected = { loading: false, data: [] }
      const actual = reducer(undefined, { type: 'fake' })
      expect(actual).toEqual(expected)
    })
  })

  describe('INCIDENTS_FETCHING action type', () => {
    it('should set loading to true', () => {
      const actual = reducer(undefined, { type: INCIDENTS_FETCHING })
      expect(actual.loading).toEqual(true)
    })
  })

  describe('INCIDENTS_RECEIVED action type', () => {
    const action = { type: INCIDENTS_RECEIVED, data: [{ key: 'fake' }] }

    it('should set loading to false', () => {
      const actual = reducer(undefined, action)
      expect(actual.loading).toEqual(false)
    })

    it('should set data equal to the array', () => {
      const actual = reducer(undefined, action)
      expect(actual.data).toEqual(action.data)
    })
  })
})
