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
      { year: 2014, violent_crime: 10, population: 100 },
      { year: 2013, violent_crime: 10, population: 100 },
      { year: 2012, violent_crime: 10, population: 100 },
      { year: 2011, violent_crime: 10, population: 100 },
      { year: 2010, violent_crime: 10, population: 100 },
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
      { year: 2011, violent_crime: 10, population: 100 },
      { year: 2013, violent_crime: 10, population: 100 },
      { year: 2012, violent_crime: 10, population: 100 },
    ]

    const actual = mungeSummaryData({
      crime: 'violent-crime',
      summaries: { california: data, 'united-states': data },
      place: 'california',
      since: 2011,
      until: 2013,
    })
    const actualYears = actual.map(a => a.year)

    expect(actualYears[0]).toEqual(2011)
    expect(actualYears[2]).toEqual(2013)
  })

  it('should reshape the data', () => {
    const crime = 'violent-crime'
    const summaries = {
      california: [{ year: 2014, violent_crime: 10, population: 100 }],
      'united-states': [{ year: 2014, violent_crime: 10, population: 100 }],
    }
    const place = 'california'
    expect(mungeSummaryData({ crime, summaries, place })).toEqual([
      {
        year: 2014,
        california: { [crime]: { count: 10, rate: 10000 }, population: 100 },
        'united-states': {
          [crime]: { count: 10, rate: 10000 },
          population: 100,
        },
      },
    ])
  })

  it('should return data for both rape definitions', () => {
    const crime = 'rape'
    const summaries = {
      'united-states': [
        { year: 2014, rape_legacy: 10, rape_revised: 10, population: 100 },
      ],
    }
    const place = 'united-states'
    expect(mungeSummaryData({ crime, summaries, place })).toEqual([
      {
        year: 2014,
        'united-states': {
          'rape-legacy': { count: 10, rate: 10000 },
          'rape-revised': { count: 10, rate: 10000 },
          population: 100,
        },
      },
    ])
  })
})
