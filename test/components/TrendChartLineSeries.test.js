/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import uniq from 'lodash.uniqby'
import React from 'react'

import TrendChartLineSeries from '../../src/components/TrendChartLineSeries'

describe('TrendChartLineSeries', () => {
  const data = [
    {
      date: '2012-01-01T05:00:00.000Z',
      year: 2012,
      population: 313873685,
      count: 1217057,
      rate: 387.7537551451629,
    },
    {
      date: '2013-01-01T05:00:00.000Z',
      year: 2013,
      population: 316497531,
      count: 1168298,
      rate: 369.13336932160774,
    },
    {
      date: '2014-01-01T05:00:00.000Z',
      year: 2014,
      population: 318907401,
      count: 1153022,
      rate: 361.5538543114589,
    },
  ]
  const series = [
    {
      crime: 'violent-crime',
      gaps: [],
      place: 'united-states',
      segments: [data],
      values: data,
    },
  ]
  const filters = {
    since: 2012,
    until: 2014,
    crime: 'violent-crime',
    place: 'united-states',
  }
  let chart
  const x = () => 0.7
  const y = () => 0.6

  beforeEach(() => {
    chart = shallow(
      <TrendChartLineSeries series={series} x={x} y={y} {...filters} />,
    )
  })

  it('TrendChart has a line (<path>) for each series', () => {
    expect(chart.find('.series path').length).toEqual(series.length)
  })
})
