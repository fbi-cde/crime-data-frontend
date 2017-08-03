/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import AgencySearch from '../../src/components/AgencySearch'

describe('AgencySearch', () => {
  describe('componentWillReceiveProps()', () => {
    it('should update search key in state with agency name', () => {
      const props = {
        agency: '',
        data: [{ agency_name: 'Fake Agency', ori: 'TX123456' }],
      }
      const wrapper = shallow(<AgencySearch {...props} />)
      wrapper.instance().componentWillReceiveProps({
        agency: 'Second Fake Agency',
      })

      expect(wrapper.state().search).toEqual('Second Fake Agency')
    })

    it('should set hasSelection to false if agency is an empty string', () => {
      const props = {
        agency: '',
        data: [{ agency_name: 'Fake Agency', ori: 'TX123456' }],
      }
      const wrapper = shallow(<AgencySearch {...props} />)
      wrapper.instance().componentWillReceiveProps({ agency: '' })

      expect(wrapper.state().hasSelection).toEqual(false)
    })
  })
})
