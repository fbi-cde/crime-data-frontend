/* eslint no-undef: 0 */

import {
  calculateRates,
  combinePlaces,
  filterByYear,
  reshapeData,
} from '../../src/util/summary'

describe('summary util', () => {
  describe('calculateRates()', () => {
    const createApiResponse = () => ({
      'united-states': [
        {
          year: 2010,
          population: 1000,
          violent_crime: 5,
          robbery: 5,
        },
      ],
    })
    it('should add rates to all offenses', () => {
      const resp = createApiResponse()
      const actual = calculateRates(resp,'state')['united-states'][0]
      const expected = { count: 5, rate: 500 }
      expect(actual['violent-crime']).toEqual(expected)
      expect(actual.robbery).toEqual(expected)
    })

    it('should ignore certain keys such as population', () => {
      const resp = createApiResponse()
      const actual = calculateRates(resp,'state')['united-states'][0]
      expect(actual.population).toEqual(1000)
    })
  })

  describe('combinePlaces()', () => {
    const places = ['united-states', 'california']
    const years = [2010, 2011, 2012, 2013, 2014]
    const createApiResponse = () =>
      Object.assign(
        {},
        ...places.map(place => ({
          [place]: years.map(year => ({
            year,
            population: 1000,
            'violent-crime': {
              count: 5,
              rate: 10,
            },
            robbery: {
              count: 5,
              rate: 10,
            },
          })),
        })),
      )

    it('should return an array where each object has keys for the year and the places', () => {
      const resp = createApiResponse()
      const actual = combinePlaces(resp, ['violent-crime'])

      const first = Object.keys(actual[0])
      const last = Object.keys(actual[actual.length - 1])

      expect(first.includes('year')).toEqual(true)
      expect(first.includes('california')).toEqual(true)
      expect(first.includes('united-states')).toEqual(true)

      expect(last.includes('year')).toEqual(true)
      expect(last.includes('california')).toEqual(true)
      expect(last.includes('united-states')).toEqual(true)
    })

    it('should return an array where each object has the rate and counts for offenses', () => {
      const resp = createApiResponse()
      const actual = combinePlaces(resp, ['violent-crime', 'robbery'])

      const hasOffenseObject = actual.filter(a => {
        if (
          a['united-states']['violent-crime'].count &&
          a['united-states']['violent-crime'].rate &&
          a['united-states'].robbery.count &&
          a['united-states'].robbery.rate
        ) {
          return true
        }
        return false
      })
      expect(hasOffenseObject.length).toEqual(actual.length)
    })
  })

  describe('filterByYear()', () => {
    const years = [2010, 2011, 2012, 2013, 2014]
    const createApiResponse = () => ({
      'united-states': years.map(year => ({
        year,
        population: 1000,
        violent_crime: 5,
        robbery: 5,
      })),
    })
    it('should return data, incusively, where year is more recent than since', () => {
      const resp = createApiResponse()
      const actual = filterByYear(resp, { since: 2012 })
      const hasEarlier = actual['united-states'].find(y => y.year === 2010)
      expect(hasEarlier).toEqual(undefined)
    })

    it('should return data, inclusively, where year is earlier than until', () => {
      const resp = createApiResponse()
      const actual = filterByYear(resp, { until: 2012 })
      const hasLater = actual['united-states'].find(y => y.year === 2014)
      expect(hasLater).toEqual(undefined)
    })

    it('should return data, inclusively, between since and until', () => {
      const resp = createApiResponse()
      const actual = filterByYear(resp, 2011, 2012 )
      const hasYears = actual['united-states'].map(y => y.year)
      expect(hasYears).toEqual([2011, 2012])
    })
  })

  describe('reshapeData()', () => {
    it('should turn array into a single object', () => {
      const actual = reshapeData([
        { key: 'fake-one', results: 'yoo' },
        { key: 'fake-two', results: 'other' },
      ])
      expect(actual).toEqual({ 'fake-one': 'yoo', 'fake-two': 'other' })
    })
  })
})
