/* eslint no-undef: 0 */

import {
  GLOSSARY_HIDE,
  GLOSSARY_SHOW,
  GLOSSARY_SHOW_TERM,
} from '../../src/actions/constants'
import { hideGlossary, showGlossary, showTerm } from '../../src/actions/glossary'


describe('glossary actions', () => {
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

  describe('showTerm()', () => {
    it('should return a GLOSSARY_SHOW_TERM action', () => {
      const actual = showTerm('fake-term')
      expect(actual.type).toEqual(GLOSSARY_SHOW_TERM)
    })
  })
})
