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

  describe('handleChange()', () => {
    it('should update the state with the new values', () => {
      const fields = [{ id: 'foo', label: 'fake label' }]
      const wrapper = shallow(<Feedback fields={fields} onClose={() => {}} />)
      wrapper.instance().handleChange({ target: { name: 'foo', value: 'bar' } })

      expect(wrapper.state().data.foo).toEqual('bar')
    })

    it('should not update the other values', () => {
      const fields = [
        { id: 'foo', label: 'fake label' },
        { id: 'zee', label: 'some text' },
      ]
      const wrapper = shallow(<Feedback fields={fields} onClose={() => {}} />)
      wrapper.instance().handleChange({ target: { name: 'foo', value: 'bar' } })

      expect(wrapper.state().data.zee).toEqual('')
    })
  })

  describe('handleValidationError()', () => {
    it('should set the state with an error object', () => {
      const wrapper = shallow(<Feedback onClose={() => {}} />)
      wrapper.instance().handleValidationError()

      expect(wrapper.state().result.type).toEqual('error')
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
      wrapper.setState({ ...wrapper.state(), data: { foo: 'yo' } })

      expect(wrapper.instance().validateSubmission()).toEqual(true)
    })
  })
})
