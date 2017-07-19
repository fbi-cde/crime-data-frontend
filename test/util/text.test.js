/* eslint no-undef: 0 */

import { sentenceCase, slugify } from '../../src/util/text'

describe('text utility', () => {
  describe('sentenceCase()', () => {
    it('should return a string with only the first character uppercase', () => {
      const initial = 'Fake Stuff Goes Here'
      expect(sentenceCase(initial)).toEqual('Fake stuff goes here')
    })
  })

  describe('slugify()', () => {
    it('should lowercase and replace spaces with hyphens', () => {
      const initial = 'Fake Stuff Goes Here'
      expect(slugify(initial)).toEqual('fake-stuff-goes-here')
    })

    it('should return an empty string if nothing is provided', () => {
      expect(slugify()).toEqual('')
    })
  })
})
