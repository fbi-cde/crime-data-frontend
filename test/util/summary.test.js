/* eslint no-undef: 0 */

import mungeSummaryData from '../../src/util/summary'

describe('summary data munging utility', () => {
  it('should return false if summaries is not supplied', () => {
    const crime = 'violent-crime'
    expect(mungeSummaryData({ summaries: null, crime })).toEqual(false)
  })

  it('should return false if summaries[place] is not supplied', () => {
    const crime = 'violent-crime'
    const summaries = {}
    const place = 'california'
    expect(mungeSummaryData({ crime, summaries, place })).toEqual(false)
  })

  it('should filter data to be inclusive of since and until, if provided', () => {
    const data = [
      { year: 2014, 'violent-crime': 10, population: 100 },
      { year: 2013, 'violent-crime': 10, population: 100 },
      { year: 2012, 'violent-crime': 10, population: 100 },
      { year: 2011, 'violent-crime': 10, population: 100 },
      { year: 2010, 'violent-crime': 10, population: 100 },
    ]
    const crime = 'violent-crime'
    const summaries = { california: data, 'united-states': data }
    const place = 'california'
    const actual = mungeSummaryData({
      crime,
      summaries,
      place,
      since: 2013,
      until: 2014,
    })
    expect(actual.length).toEqual(2)
  })

  it('should sort the data by date', () => {
    const data = [
      { year: 2011, 'violent-crime': 10, population: 100 },
      { year: 2013, 'violent-crime': 10, population: 100 },
      { year: 2012, 'violent-crime': 10, population: 100 },
    ]

    const actual = mungeSummaryData({
      crime: 'violent-crime',
      summaries: { california: data, 'united-states': data },
      place: 'california',
      since: 2011,
      until: 2013,
    })
    const actualYears = actual.map(a => a.date)

    expect(actualYears[0]).toEqual(2011)
    expect(actualYears[2]).toEqual(2013)
  })

  it('should reshape the data', () => {
    const crime = 'violent-crime'
    const summaries = {
      california: [{ year: 2014, 'violent-crime': 10, population: 100 }],
      'united-states': [{ year: 2014, 'violent-crime': 10, population: 100 }],
    }
    const place = 'california'
    expect(mungeSummaryData({ crime, summaries, place })).toEqual([
      {
        date: 2014,
        california: { count: 10, pop: 100, rate: 10000 },
        'united-states': { count: 10, pop: 100, rate: 10000 },
      },
    ])
  })
})
