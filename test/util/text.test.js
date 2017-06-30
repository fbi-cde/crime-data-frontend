/* eslint no-undef: 0 */

import { slugify } from '../../src/util/text'

describe('text utility', () => {
  describe('slugify()', () => {
    it('should lowercase and replace spaces with hyphens', () => {
      const initial = 'Fake Stuff Goes Here'
      const expected = 'fake-stuff-goes-here'
      expect(slugify(initial)).toEqual(expected)
    })

    it('should return an empty string if nothing is provided', () => {
      expect(slugify()).toEqual('')
    })
  })
})
