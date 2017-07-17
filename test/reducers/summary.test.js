/* eslint no-undef: 0 */

import {
  SUMMARY_FAILED,
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED,
} from '../../src/actions/constants'
import reducer from '../../src/reducers/summary'

describe('summary', () => {
  const error = {
    config: { url: '/failed/api/call' },
    message: 'This could not be found',
    response: { status: 400 },
  }

  describe('initial state', () => {
    it('should have loading set to false', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(initialState.loading).toEqual(false)
    })
  })

  describe('SUMMARY_FAILED action type', () => {
    it('should set error to the value of the error object and loading to false', () => {
      const action = { type: SUMMARY_FAILED, error }
      const initialState = reducer(undefined, action)
      expect(initialState.error.code).toEqual(error.response.status)
      expect(initialState.error.message).toEqual(error.message)
      expect(initialState.error.url).toEqual(error.config.url)
      expect(initialState.loading).toEqual(false)
    })
  })

  describe('SUMMARY_FETCHING action type', () => {
    it('should set loading to true and error to null', () => {
      const initialState = reducer(undefined, { type: SUMMARY_FETCHING })
      expect(initialState.loading).toEqual(true)
      expect(initialState.error).toEqual(null)
    })
  })

  describe('SUMMARY_RECEIVED action type', () => {
    it('should set loading to false', () => {
      const initialState = reducer(undefined, { type: SUMMARY_RECEIVED })
      expect(initialState.loading).toEqual(false)
    })

    it('should add any summary (or summaries) to state', () => {
      const action = {
        type: SUMMARY_RECEIVED,
        summaries: {
          fakePlace: ['testing', 'data'],
          secondFakePlace: ['more', 'testing', 'data'],
        },
      }
      const s = reducer(undefined, action)
      expect(s.data.fakePlace).toEqual(action.summaries.fakePlace)
      expect(s.data.secondFakePlace).toEqual(action.summaries.secondFakePlace)
    })

    it('should replace any summary which already exists', () => {
      const action = {
        type: SUMMARY_RECEIVED,
        summaries: { fakePlace: ['testing', 'data'] },
      }
      const s = reducer({ fakePlace: ['initial'] }, action)
      expect(s.data.fakePlace).toEqual(action.summaries.fakePlace)
    })

    it('should not remove unrelated summary', () => {
      const action = {
        type: SUMMARY_RECEIVED,
        summaries: { fakeOtherPlace: ['testing'] },
      }
      const s = reducer({ data: { fakePlace: ['initial'] } }, action)
      expect(s.data.fakePlace).toEqual(['initial'])
      expect(s.data.fakeOtherPlace).toEqual(['testing'])
    })
  })
})
