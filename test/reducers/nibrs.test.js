/* eslint no-undef: 0 */

import {
  NIBRS_FAILED,
  NIBRS_FETCHING,
  NIBRS_RECEIVED,
} from '../../src/actions/constants'
import reducer from '../../src/reducers/nibrs'

describe('nibrs', () => {
  const error = {
    config: { url: '/failed/api/call' },
    message: 'This could not be found',
    response: { status: 400 },
  }

  describe('initial state', () => {
    it('should return loading: false and data: []', () => {
      const expected = { loading: false, data: null, error: null }
      const actual = reducer(undefined, { type: 'fake' })
      expect(actual).toEqual(expected)
    })
  })

  describe('NIBRS_FAILED action type', () => {
    it('should set error to error obj', () => {
      const actual = reducer(undefined, { type: NIBRS_FAILED, error })
      expect(actual.error.code).toEqual(error.response.status)
    })
  })

  describe('NIBRS_FETCHING action type', () => {
    it('should set loading to true and error to null', () => {
      const actual = reducer(undefined, { type: NIBRS_FETCHING })
      expect(actual.loading).toEqual(true)
      expect(actual.error).toEqual(null)
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
