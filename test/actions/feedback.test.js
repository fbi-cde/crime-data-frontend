/* eslint no-undef: 0 */

import { FEEDBACK_HIDE, FEEDBACK_SHOW } from '../../src/actions/constants'
import { hideFeedback, showFeedback } from '../../src/actions/feedback'


describe('feedback actions', () => {
  describe('hideFeedback()', () => {
    it('should return a FEEDBACK_HIDE action', () => {
      const actual = hideFeedback()
      expect(actual.type).toEqual(FEEDBACK_HIDE)
    })
  })

  describe('showFeedback()', () => {
    it('should return a FEEDBACK_SHOW action', () => {
      const actual = showFeedback()
      expect(actual.type).toEqual(FEEDBACK_SHOW)
    })
  })
})
