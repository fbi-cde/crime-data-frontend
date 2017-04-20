/* eslint no-undef: 0 */

import {
  UCR_PARTICIPATION_FETCHING,
  UCR_PARTICIPATION_RECEIVED,
} from '../../src/actions/constants'
import reducer from '../../src/reducers/ucr'


describe('ucr', () => {
  describe('initial state', () => {
    it('should have loading set to false', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(initialState.loading).toEqual(false)
    })
  })

  describe('UCR_PARTICIPATION_FETCHING action type', () => {
    it('should set loading to true', () => {
      const action = { type: UCR_PARTICIPATION_FETCHING }
      const initialState = reducer(undefined, action)
      expect(initialState.loading).toEqual(true)
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
          'fake-place': []
        }
      }
      const initialState = reducer(undefined, action)
      expect(initialState.data['fake-place']).toEqual([])
    })

    it('should not alter previous data in state', () => {
      const action = {
        type: UCR_PARTICIPATION_RECEIVED,
        results: {
          'other-fake-place': ['new-data']
        }
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
