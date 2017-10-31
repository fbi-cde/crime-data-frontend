/* eslint no-undef: 0, no-unused-vars: 0 */

// import { shallow } from 'enzyme'
import React from 'react'

import { mapStateToProps } from '../../src/containers/TrendContainer'

describe('TrendContainer', () => {
  describe('mapStateToProps()', () => {
    it('should pass an array of places to display', () => {
      const filters = { place: 'california', placeType: 'state' }
      const summaries = {
        data: { california: [], texas: [], 'united-states': [] },
      }

      const actual = mapStateToProps({ filters, summaries })
      expect(actual.places.includes('california')).toEqual(true)
      expect(actual.places.includes('united-states')).toEqual(true)
      expect(actual.places.includes('texas')).toEqual(false)
    })

    it('should return all filters as top level keys', () => {
      const filters = { place: 'california', placeType: 'state', random: true }
      const summaries = {
        data: { california: [], 'united-states': [] },
      }
      const actual = mapStateToProps({ filters, summaries })
      expect(actual.place).toEqual('california')
    })
  })
})
