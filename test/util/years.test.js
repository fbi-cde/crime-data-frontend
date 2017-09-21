/* eslint no-undef: 0 */

import { rangeYears } from '../../src/util/years'

describe('years utility', () => {
  describe('rangeYears()', () => {
    it('should return a range based on since and until', () => {
      const actual = rangeYears(2000, 2020)
      expect(actual.length).toEqual(21)
      expect(actual.includes(2004))
      expect(actual.includes(20014))
    })
  })
})
