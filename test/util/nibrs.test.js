/* eslint no-undef: 0 */

import mockApiData from '../fixtures/nibrsApiResponse.json'
import parseNibrs, { reshape, rename } from '../../src/util/nibrs'


describe('nibrs utility', () => {
  describe('reshape()', () => {
    it('should aggregate counts by key, convert to array', () => {
      const data = [
        { foo: 'a', count: 1 },
        { foo: 'a', count: 2 },
        { foo: 'a', count: 3 },
        { foo: 'b', count: 10 },
        { foo: 'b', count: 20 },
      ]

      expect(reshape(data, 'foo')).toEqual([
        { key: 'a', count: 6 },
        { key: 'b', count: 30 },
      ])
    })
  })

  describe('rename()', () => {
    it('should change key field, keep count field', () => {
      const data = [{ key: 'a', count: 1 }, { key: 'b', count: 2 }]
      const lookup = { a: 'foo', b: 'bar' }

      expect(rename(data, lookup)).toEqual([
        { key: 'foo', count: 1 }, { key: 'bar', count: 2 },
      ])
    })
  })

  describe('parseNibrs()', () => {
    // TODO: add more robust tests of this function, as right now it just checks
    // for the titles of the sections and not the shape of the data
    it('should parse the data into an array with the proper titles', () => {
      const actual = parseNibrs(mockApiData)
      expect(actual.length).toEqual(4)
      expect(actual[0].title.toLowerCase()).toEqual('offender demographics')
      expect(actual[1].title.toLowerCase()).toEqual('victim demographics')
      expect(actual[2].title.toLowerCase()).toEqual('victim’s relationship to the offender')
      expect(actual[3].title.toLowerCase()).toEqual('location type')
    })
  })
})
