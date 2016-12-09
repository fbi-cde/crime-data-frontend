import React from 'react';
import { shallow } from 'enzyme';

import BarChart from '../../src/components/BarChart';

describe('BarChart', () => {
  const data = [['red', 5], ['green', 7], ['yellow', 2]]
  let chart

  beforeEach(() => {
    chart = shallow(<BarChart data={data} />)
  })

  it('BarChart renders svg', () => {
    expect(chart.find('svg').length).toEqual(1)
  })

  it('BarChart has a rect element for each data point', () => {
    expect(chart.find('rect').length).toEqual(data.length)
  })

  it('BarChart has a label for each data point by default', () => {
    expect(chart.find('.bar text').length).toEqual(data.length)
  })

  it('BarChart can be configured with no labels', () => {
    chart = shallow(<BarChart data={data} labels={false} />)
    expect(chart.find('.bar text').length).toEqual(0)
  })
})
