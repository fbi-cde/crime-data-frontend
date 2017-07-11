/* eslint no-undef: 0 */

import {
  UCR_PARTICIPATION_FAILED,
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from '../../src/actions/constants'
import reducer from '../../src/reducers/participation'

describe('ucr reducer', () => {
  const error = {
    config: { url: '/failed/api/call' },
    message: 'This could not be found',
    response: { status: 400 },
  }

  describe('initial state', () => {
    it('should have loading set to false and an empty data object', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(initialState.loading).toEqual(false)
      expect(initialState.data).toEqual({})
    })
  })

  describe('UCR_PARTICIPATION_FAILED action type', () => {
    it('should set error to the value of the error object and loading to false', () => {
      const action = { type: UCR_PARTICIPATION_FAILED, error }
      const initialState = reducer(undefined, action)
      expect(initialState.error.code).toEqual(error.response.status)
      expect(initialState.error.message).toEqual(error.message)
      expect(initialState.error.url).toEqual(error.config.url)
      expect(initialState.loading).toEqual(false)
    })
  })

  describe('UCR_PARTICIPATION_FETCHING action type', () => {
    it('should set loading to true and error to null', () => {
      const action = { type: UCR_PARTICIPATION_FETCHING }
      const initialState = reducer(undefined, action)
      expect(initialState.loading).toEqual(true)
      expect(initialState.error).toEqual(null)
    })
  })

  describe('UCR_PARTICIPATION_RECEIVED action type', () => {
    it('should set loading to false', () => {
      const action = { type: UCR_PARTICIPATION_RECEIVED }
      const initialState = reducer(undefined, action)
      expect(initialState.loading).toEqual(false)
    })

    it('should set place and results from action', () => {
      const action = {
        type: UCR_PARTICIPATION_RECEIVED,
        results: {
          'fake-place': [],
        },
      }
      const initialState = reducer(undefined, action)
      expect(initialState.data['fake-place']).toEqual([])
    })

    it('should not alter previous data in state', () => {
      const action = {
        type: UCR_PARTICIPATION_RECEIVED,
        results: {
          'other-fake-place': ['new-data'],
        },
      }
      const initialState = {
        loading: false,
        data: {
          'initial-fake-place': ['existing-data'],
        },
      }
      const state = reducer(initialState, action)
      expect(state.data['initial-fake-place']).toEqual(['existing-data'])
    })
  })
})
