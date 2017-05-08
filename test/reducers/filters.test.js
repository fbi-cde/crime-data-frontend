/* eslint no-undef: 0 */

import { FILTER_RESET, FILTERS_UPDATE } from '../../src/actions/constants'
import reducer from '../../src/reducers/filters'

describe('filters', () => {
  describe('initial state', () => {
    it('should return a small object with time values', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(Object.keys(initialState).length).toEqual(3)
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

  describe('FILTERS_UPDATE action type', () => {
    it("should set all of the filters' values", () => {
      const action = {
        type: FILTERS_UPDATE,
        filters: {
          fakeOne: 'yo',
          fakeTwo: 'hey',
        },
      }
      const actual = reducer({}, action)
      expect(Object.keys(actual).length).toEqual(2)
      expect(actual.fakeOne).toEqual('yo')
      expect(actual.fakeTwo).toEqual('hey')
    })

    it('should not change any other filter values not in the action', () => {
      const action = {
        type: FILTERS_UPDATE,
        filters: {
          fakeTwo: 'hey',
        },
      }
      const actual = reducer({ fakeOne: 'yo' }, action)
      expect(Object.keys(actual).length).toEqual(2)
      expect(actual.fakeOne).toEqual('yo')
      expect(actual.fakeTwo).toEqual('hey')
    })

    it('should not change any other filter values not in the action', () => {
      const action = {
        type: FILTERS_UPDATE,
        filters: {
          fakeTwo: 'hey',
        },
      }
      const actual = reducer({ fakeOne: 'yo' }, action)
      expect(Object.keys(actual).length).toEqual(2)
      expect(actual.fakeOne).toEqual('yo')
      expect(actual.fakeTwo).toEqual('hey')
    })
  })
})
