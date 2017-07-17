/* eslint no-undef: 0 */

import { hasThreatKeyword, notifyOfThreat } from '../../src/util/feedback'

describe('feedback utility', () => {
  describe('hasThreatKeyword', () => {
    it('should return true if terms are found in text', () => {
      expect(hasThreatKeyword('HeRe ARE words', ['here'])).toEqual(true)
    })

    it('should return false if terms are not supplied', () => {
      expect(hasThreatKeyword('HeRe ARE words')).toEqual(false)
    })

    it('should return false if terms argument does not have a .map function', () => {
      expect(hasThreatKeyword('HeRe ARE words', true)).toEqual(false)
    })
  })

  describe('notifyOfThreat', () => {
    it('should do nothing for now', () => {
      expect(notifyOfThreat({ html_url: '' })).toEqual(undefined)
    })
  })
})
