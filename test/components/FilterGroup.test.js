/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import FilterGroup from '../../src/components/FilterGroup'


describe('FilterGroup', () => {
  const title = 'FilterGroup'
  it('accepts an array of strings', () => {
    const data = ['Filter One', 'Filter Two']
    const group = shallow(<FilterGroup options={data} title={title} />)
    expect(group.find('input[type="radio"]').length).toEqual(2)
  })

  it('accepts an array of objects', () => {
    const data = [
      { id: 'filter-one', text: 'Filter One' },
      { id: 'filter-two', text: 'Filter Two' },
    ]
    const group = shallow(<FilterGroup options={data} title={title} />)
    expect(group.find('input[type="radio"]').length).toEqual(2)
  })

  it('accepts an array of strings and objects', () => {
    const data = [{ id: 'filter-one', text: 'Filter One' }, 'Filter Two']
    const group = shallow(<FilterGroup options={data} title={title} />)
    expect(group.find('input[type="radio"]').length).toEqual(2)
  })
})
