/* eslint no-undef: 0 */

import ids, { mapToApiOffense, mapToApiOffenseParam } from '../../src/util/offenses'


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

  describe('mapToApiOffenseParam', () => {
    it('should return "classification" for violent crime', () => {
      const actual = mapToApiOffenseParam('violent-crime')
      expect(actual).toEqual('classification')
    })

    it('should return "explorer_offense" for homicide', () => {
      const actual = mapToApiOffenseParam('homicide')
      expect(actual).toEqual('explorer_offense')
    })
  })
})
