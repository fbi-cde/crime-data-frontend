/* eslint no-undef: 0 */

import { shallow } from 'enzyme'
import React from 'react'

import LocationFilter from '../../src/components/LocationFilter'

describe('LocationFilter', () => {
  describe('getAgencyName()', () => {
    it('should return agency name if supplied as prop', () => {
      const props = {
        agency: { agency_name: 'Foo' },
        agencyData: [],
        ariaControls: 'explorer',
        onChange: () => {},
        usState: 'kentucky',
      }
      const wrapper = shallow(<LocationFilter {...props} />)
      const actual = wrapper.instance().getAgencyName()
      expect(actual).toEqual('Foo')
    })

    it('should return an empty string otherwise', () => {
      const props = {
        agency: false,
        agencyData: [],
        ariaControls: 'explorer',
        onChange: () => {},
        usState: 'kentucky',
      }
      const wrapper = shallow(<LocationFilter {...props} />)
      const actual = wrapper.instance().getAgencyName()
      expect(actual).toEqual('')
    })
  })

  describe('handleLocationFocus()', () => {
    it('should set showResults state to false', () => {
      const props = {
        agency: false,
        agencyData: [],
        ariaControls: 'explorer',
        onChange: () => {},
        usState: 'kentucky',
      }

      const wrapper = shallow(<LocationFilter {...props} />)
      wrapper.setState({ showResults: true })
      wrapper.instance().handleLocationFocus()
      expect(wrapper.state().showResults).toEqual(false)
    })
  })
})
