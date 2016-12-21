/* eslint no-undef: 0 */

import lookup, { states } from '../../src/util/usStates'

describe('usStates utility', () => {
  it('should cover all 50 states and DC', () => {
    const stateCount = Object.keys(states).length
    expect(stateCount).toEqual(51)
  })

  describe('with an abbreviation', () => {
    it('should return the proper state', () => {
      const expected = 'california'
      const actual = lookup('ca')
      expect(actual).toEqual(expected)
    })

    it('should work with uppercase abbreviations', () => {
      const expected = 'california'
      const actual = lookup('CA')
      expect(actual).toEqual(expected)
    })
  })

  describe('with a state name', () => {
    it('should return the proper abbreviation', () => {
      const expected = 'ca'
      const actual = lookup('california')
      expect(actual).toEqual(expected)
    })

    it('should work with any cased state name', () => {
      const expected = 'ca'
      const actual = lookup('CAliforNIA')
      expect(actual).toEqual(expected)
    })
  })
})
