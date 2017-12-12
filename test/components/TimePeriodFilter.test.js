/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import TimePeriodFilter from '../../src/components/TimePeriodFilter'

describe('TimePeriodFilter', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('handleChange()', () => {
    it('should call onChange prop with valid values', () => {
      const props = {
        ariaControls: '',
        onChange: sandbox.spy(),
        since: 2004,
        until: 2014,
      }

      const wrapper = shallow(<TimePeriodFilter {...props} />)
      wrapper.instance().handleChange({ target: { id: 'since', value: 2000 } })

      expect(wrapper.state().error).toBeNull()
      expect(props.onChange.getCall(0)).not.toBeNull()
    })

/*
    it('should not allow time ranges of less than ten years', () => {
      const props = {
        ariaControls: '',
        onChange: () => {},
        since: 2004,
        until: 2014,
      }
      const wrapper = shallow(<TimePeriodFilter {...props} />)
      wrapper.instance().handleChange({ target: { id: 'since', value: 2010 } })

      expect(wrapper.state().error).toEqual(
        'You must select a range of at least 10 years',
      )
    })
*/

    it('should not allow since to be greater than until', () => {
      const props = {
        ariaControls: '',
        onChange: () => {},
        since: 2000,
        until: 2010,
      }
      const wrapper = shallow(<TimePeriodFilter {...props} />)
      wrapper.instance().handleChange({ target: { id: 'since', value: 2013 } })

      expect(wrapper.state().error).toEqual(
        'The beginning year must be earlier than the end year',
      )
    })
  })

  describe('setError()', () => {
    it('should return an object with "result" set to an empty object', () => {
      const props = {
        ariaControls: '',
        onChange: () => {},
        since: 2004,
        until: 2014,
      }
      const wrapper = shallow(<TimePeriodFilter {...props} />)
      wrapper.instance().setError('fake error')

      expect(wrapper.state().error).toEqual('fake error')
    })
  })
})
