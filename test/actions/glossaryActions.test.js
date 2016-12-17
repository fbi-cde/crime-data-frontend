/* eslint no-undef: 0 */

import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
} from '../../src/actions/actionTypes';

import { hide, show } from '../../src/actions/glossaryActions';

describe('glossaryActions', () => {
  describe('hide()', () => {
    it('should return a GLOSSARY_HIDE action', () => {
      const actual = hide()
      expect(actual.type).toEqual(GLOSSARY_HIDE)
    })
  })

  describe('show()', () => {
    it('should return a GLOSSARY_SHOW action', () => {
      const actual = show()
      expect(actual.type).toEqual(GLOSSARY_SHOW)
    })
  })
})
