/* eslint no-undef: 0 */

import {
  SIDEBAR_HIDE,
  SIDEBAR_SHOW,
} from '../../src/actions/constants'
import reducer from '../../src/reducers/sidebar'


describe('sidebar', () => {
  it('it should return the initial state', () => {
    const initialState = reducer(undefined, { type: 'fake' })
    expect(initialState.isOpen).toEqual(false)
  })

  describe('SIDEBAR_HIDE action type', () => {
    it('should set isOpen to false', () => {
      const initialState = { isOpen: true }
      const actual = reducer(initialState, { type: SIDEBAR_HIDE })
      expect(actual.isOpen).toEqual(false)
    })
  })

  describe('SIDEBAR_SHOW action type', () => {
    it('should set isOpen to true', () => {
      const initialState = { isOpen: false }
      const actual = reducer(initialState, { type: SIDEBAR_SHOW })
      expect(actual.isOpen).toEqual(true)
    })
  })
})
