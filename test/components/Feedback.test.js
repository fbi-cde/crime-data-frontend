/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import Feedback from '../../src/components/Feedback'

describe('Feedback', () => {
  describe('createInitialState()', () => {
    it('returns an object with "result" set to {}', () => {
      const wrapper = shallow(<Feedback onClose={() => {}} />)
      const actual = wrapper.instance().createInitialState()

      expect(actual.result).toEqual({})
    })

    it('returns an object with "data" based on props', () => {
      const wrapper = shallow(<Feedback onClose={() => {}} />)
      const instance = wrapper.instance()
      const actualFields = Object.keys(instance.createInitialState().data)
      const propFields = instance.props.fields

      expect(actualFields.length).toEqual(propFields.length)
    })
  })

  describe('validateSubmission()', () => {
    it('returns false if all textareas are empty strings', () => {
      const wrapper = shallow(<Feedback onClose={() => {}} />)
      const actual = wrapper.instance().validateSubmission()

      expect(actual).toEqual(false)
    })

    it('returns true if at least one textarea is not an empty string', () => {
      const wrapper = shallow(
        <Feedback fields={[{ id: 'foo', label: 'hey' }]} onClose={() => {}} />,
      )
      const instance = wrapper.instance()
      const { state } = instance
      instance.state = { ...state, data: { foo: 'yo' } }

      expect(instance.validateSubmission()).toEqual(true)
    })
  })
})
