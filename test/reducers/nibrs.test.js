/* eslint no-undef: 0 */

import {
  NIBRS_FAILED,
  NIBRS_FETCHING,
  NIBRS_RECEIVED,
} from '../../src/actions/constants'

import reducer from '../../src/reducers/nibrs'

describe('nibrs', () => {
  describe('initial state', () => {
    it('should return loading: false and data: []', () => {
      const expected = { loading: false, data: null, error: null }
      const actual = reducer(undefined, { type: 'fake' })
      expect(actual).toEqual(expected)
    })
  })

  describe('NIBRS_FAILED action type', () => {
    it('should set error to error obj', () => {
      const actual = reducer(undefined, {
        type: NIBRS_FAILED,
        error: {
          message: 'fail!',
          config: { url: '/foo' },
          response: { status: 404 },
        },
      })
      expect(actual.error).toEqual({ message: 'fail!', code: 404, url: '/foo' })
    })
  })

  describe('NIBRS_FETCHING action type', () => {
    it('should set loading to true', () => {
      const actual = reducer(undefined, { type: NIBRS_FETCHING })
      expect(actual.loading).toEqual(true)
    })
  })

  describe('NIBRS_RECEIVED action type', () => {
    const action = { type: NIBRS_RECEIVED, data: [{ key: 'fake' }] }

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
