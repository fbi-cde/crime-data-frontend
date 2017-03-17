/* eslint no-undef: 0 */

import { SIDEBAR_HIDE, SIDEBAR_SHOW } from '../../src/actions/constants'
import { hideSidebar, showSidebar } from '../../src/actions/sidebar'


describe('sidebar actions', () => {
  describe('hideSidebar()', () => {
    it('should return a SIDEBAR_HIDE action', () => {
      const actual = hideSidebar()
      expect(actual.type).toEqual(SIDEBAR_HIDE)
    })
  })

  describe('showSidebar()', () => {
    it('should return a SIDEBAR_SHOW action', () => {
      const actual = showSidebar()
      expect(actual.type).toEqual(SIDEBAR_SHOW)
    })
  })
})
