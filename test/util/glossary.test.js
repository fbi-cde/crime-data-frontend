/* eslint no-undef: 0 */

import mapCrimeToGlossaryTerm from '../../src/util/glossary'

describe('glossary utility', () => {
  it('default export should be a function', () => {
    expect(typeof mapCrimeToGlossaryTerm).toEqual('function')
  })

  it('should return a term if it exists', () => {
    const actual = mapCrimeToGlossaryTerm('larceny-theft')
    expect(actual).toEqual('larceny')
  })

  it('should return undefined if there is no matching term', () => {
    const actual = mapCrimeToGlossaryTerm('fake-term')
    expect(actual).toEqual(undefined)
  })
})
