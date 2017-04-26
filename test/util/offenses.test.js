/* eslint no-undef: 0 */

import ids, { mapToApiOffense } from '../../src/util/offenses'


describe('offenses utility', () => {
  it('default export should be an array', () => {
    expect(typeof ids.length).toEqual('number')
  })

  describe('mapToApiOffense', () => {
    it('should slugify input offense', () => {
      const actual = mapToApiOffense('Aggravated assault')
      expect(actual).toEqual('aggravated-assault')
    })
  })
})
