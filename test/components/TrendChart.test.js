/* eslint no-undef: 0 */

import React from 'react';
import { shallow } from 'enzyme';

import TrendChart from '../../src/components/TrendChart';

describe('TrendChart', () => {
  const data = [
    { date: '2016-01-01', foo: 5, bar: 7 },
    { date: '2016-01-02', foo: 7, bar: 2 },
    { date: '2016-01-03', foo: 4, bar: 4 },
  ]
  const filters = {
    timeFrom: 1990,
    timeTo: 2014,
  }
  const keys = ['foo', 'bar']
  let chart

  beforeEach(() => {
    chart = shallow(<TrendChart data={data} filters={filters} keys={keys} />)
  });

  it('TrendChart renders svg', () => {
    expect(chart.find('svg').length).toEqual(1)
  })

  it('TrendChart has a line (<path>) for each series', () => {
    expect(chart.find('.series path').length).toEqual(keys.length)
  })
})
