/* eslint no-undef: 0 */

import mockApiData from '../fixtures/nibrsApiResponse.json'
import parseNibrs, { binAge, reshape, rename } from '../../src/util/nibrs'

describe('nibrs utility', () => {
  describe('binAge()', () => {
    it('should aggregate counts in ten year bins', () => {
      const data = [
        { key: 1, count: 10 },
        { key: 2, count: 15 },
        { key: 11, count: 20 },
        { key: 22, count: 25 },
      ]
      expect(binAge(data)).toEqual([
        { binEnd: 9, binStart: 0, count: 25, key: '0-9' },
        { binEnd: 19, binStart: 10, count: 20, key: '10-19' },
        { binEnd: 29, binStart: 20, count: 25, key: '20-29' },
      ])
    })
  })

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
        { key: 'foo', count: 1 },
        { key: 'bar', count: 2 },
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
      expect(actual[2].title.toLowerCase()).toEqual(
        'victim’s relationship to the offender',
      )
      expect(actual[3].title.toLowerCase()).toEqual('location type')
    })
  })
})
