/* eslint no-undef: 0 */

import { AGENCY_FETCHING, AGENCY_RECEIVED } from '../../src/actions/constants'
import reducer from '../../src/reducers/agencies'

describe('agencies reducer', () => {
  describe('initial state', () => {
    it('should have loading set to false', () => {
      const initialState = reducer(undefined, { type: 'fake' })
      expect(initialState.loading).toEqual(false)
    })
  })

  describe('AGENCY_FETCHING action type', () => {
    it('should set loading to true', () => {
      const initialState = reducer(undefined, { type: AGENCY_FETCHING })
      expect(initialState.loading).toEqual(true)
    })
  })

  describe('AGENCY_RECEIVED action type', () => {
    it('should set loading to false', () => {
      const initialState = reducer(undefined, { type: AGENCY_RECEIVED })
      expect(initialState.loading).toEqual(false)
    })

    it('should add any agencies to state', () => {
      const action = {
        type: AGENCY_RECEIVED,
        agency: {
          FAKEORI: ['testing', 'data'],
        },
      }
      const s = reducer(undefined, action)
      expect(s.FAKEORI).toEqual(action.agency.FAKEORI)
    })
  })
})
