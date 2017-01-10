/* eslint no-undef: 0 */

import {
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED,
} from '../../src/actions/actionTypes';

import reducer from '../../src/reducers/summaryReducer';

describe('summaryReducer', () => {
  describe('initial state', () => {
    it('should have loading set to false', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(initialState.loading).toEqual(false)
    })
  })

  describe('SUMMARY_FETCHING action type', () => {
    it('should set loading to true', () => {
      const initialState = reducer(undefined, { type: SUMMARY_FETCHING })
      expect(initialState.loading).toEqual(true)
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
      expect(s.fakePlace).toEqual(action.summaries.fakePlace)
      expect(s.secondFakePlace).toEqual(action.summaries.secondFakePlace)
    })

    it('should replace any summary which already exists', () => {
      const action = {
        type: SUMMARY_RECEIVED,
        summaries: { fakePlace: ['testing', 'data'] },
      }
      const s = reducer({ fakePlace: ['initial'] }, action)
      expect(s.fakePlace).toEqual(action.summaries.fakePlace)
    })
  })
})
