/* eslint no-undef: 0 */

import createUrl from '../../src/util/url'

describe('url utility', () => {
  it('should properly form a url with an alphabetized query string', () => {
    const actual = createUrl('fake-url.com', { param: 'fake-param', another: 'more-fake' })
    expect(actual).toEqual('fake-url.com?another=more-fake&param=fake-param')
  })

  it('should work without any query string params', () => {
    const actual = createUrl('fake-url.com')
    expect(actual).toEqual('fake-url.com')
  })
})
