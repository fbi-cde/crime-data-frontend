/* eslint no-undef: 0 */

import {
  FEEDBACK_HIDE,
  FEEDBACK_SHOW,
} from '../../src/actions/constants'
import reducer from '../../src/reducers/feedback'


describe('feedback', () => {
  it('it should return the initial state', () => {
    const initialState = reducer(undefined, { type: 'fake' })
    expect(initialState.isOpen).toEqual(false)
  })

  describe('FEEDBACK_HIDE action type', () => {
    it('should set isOpen to false', () => {
      const initialState = { isOpen: true }
      const actual = reducer(initialState, { type: FEEDBACK_HIDE })
      expect(actual.isOpen).toEqual(false)
    })
  })

  describe('FEEDBACK_SHOW action type', () => {
    it('should set isOpen to true', () => {
      const initialState = { isOpen: false }
      const actual = reducer(initialState, { type: FEEDBACK_SHOW })
      expect(actual.isOpen).toEqual(true)
    })
  })
})
