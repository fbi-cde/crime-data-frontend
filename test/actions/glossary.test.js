/* eslint no-undef: 0 */

import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
} from '../../src/actions/constants'

import { hideGlossary, showGlossary } from '../../src/actions/glossary'

describe('glossary', () => {
  describe('hideGlossary()', () => {
    it('should return a GLOSSARY_HIDE action', () => {
      const actual = hideGlossary()
      expect(actual.type).toEqual(GLOSSARY_HIDE)
    })
  })

  describe('showGlossary()', () => {
    it('should return a GLOSSARY_SHOW action', () => {
      const actual = showGlossary()
      expect(actual.type).toEqual(GLOSSARY_SHOW)
    })
  })
})
