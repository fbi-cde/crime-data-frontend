/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import TrendChart from '../../src/components/trend/TrendChart'

describe('TrendChart', () => {
  const data = [
    ...[2012, 2013, 2014].map(year => ({
      'united-states': {
        population: 100,
        'violent-crime': { count: 10, rate: 100 },
      },
      year,
    })),
  ]
  const filters = {
    since: 2012,
    until: 2014,
    crime: 'violent-crime',
    places: ['united-states'],
  }
  let chart

  beforeEach(() => {
    chart = shallow(<TrendChart data={data} {...filters} />)
  })

  it('TrendChart renders svg', () => {
    expect(chart.find('svg').length).toEqual(1)
  })

  describe('createSeries()', () => {
    // it('should return empty arrays if no data is passed in', () => {
    //   const crimes = []
    //   const dataByYear = []
    //   const places = []
    //   const actual = chart.instance().createSeries(crimes, dataByYear, places)
    //   expect(actual).toEqual(false)
    // })

    it('work', () => {
      const actual = chart.instance().createSeries(data)
      const { rates, series } = actual
      expect(rates.length).toEqual(data.length)
      expect(series.length).toEqual(filters.places.length * crimes.length)
      expect(series).toEqual(false)
    })
  })
})
