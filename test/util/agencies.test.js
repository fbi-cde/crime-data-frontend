/* eslint no-undef: 0 */

import { oriToState, reshapeData } from '../../src/util/agencies'

describe('agencies utility', () => {
  describe('oriToState()', () => {
    it('should return the state an ORI is in', () => {
      expect(oriToState('FL123456')).toEqual('florida')
      expect(oriToState('NB123456')).toEqual('nebraska')
      expect(oriToState('NJ123456')).toEqual('new-jersey')
      expect(oriToState('NY123456')).toEqual('new-york')

      // nebraska changed from NB to NE
      // http://about.usps.com/who-we-are/postal-history/state-abbreviations.pdf
    })
  })

  describe('reshapeData()', () => {
    it('should reshape the JSON from the API scrape to the form we want', () => {
      const mockData = {
        ca: [1, 2, 3, 4],
        nj: [5, 6, 7, 8],
        fake: [],
      }
      const actual = reshapeData(mockData)
      expect(actual.california).toEqual(mockData.ca)
      expect(actual['new-jersey']).toEqual(mockData.nj)
      expect(actual.fake).toEqual(undefined)
    })
  })
})
