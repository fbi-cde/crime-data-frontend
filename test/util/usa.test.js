/* eslint no-undef: 0 */

import lookup from '../../src/util/usa'

describe('usa utility', () => {
  describe('with an abbreviation', () => {
    it('should return the proper state', () => {
      const expected = 'california'
      const actual = lookup('ca')
      expect(actual.slug).toEqual(expected)
    })

    it('should work with uppercase abbreviations', () => {
      const expected = 'california'
      const actual = lookup('CA')
      expect(actual.slug).toEqual(expected)
    })
  })

  describe('with a state name', () => {
    it('should return the proper abbreviation', () => {
      const expected = 'ca'
      const actual = lookup('california')
      expect(actual.id).toEqual(expected)
    })
  })
})
