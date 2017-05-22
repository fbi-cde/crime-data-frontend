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
      const action = { type: AGENCY_RECEIVED, agency: { ori: 'CA123457' } }
      const initialState = reducer(undefined, action)
      expect(initialState.loading).toEqual(false)
    })

    it('should update the received agency', () => {
      const ori = 'CA1234567'
      const action = {
        type: AGENCY_RECEIVED,
        agency: {
          agency_name: 'Fake California Agency',
          ori,
        },
      }
      const s = reducer(undefined, action)
      expect(s.data.california[ori]).toEqual(action.agency)
    })
  })
})
