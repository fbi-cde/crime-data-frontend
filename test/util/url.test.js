/* eslint no-undef: 0 */

import createUrl from '../../src/util/url'

describe('url utility', () => {
  it('should properly form a url with a query string', () => {
    const actual = createUrl('fake-url.com', { param: 'fake-param' })
    expect(actual).toEqual('fake-url.com?param=fake-param')
  })

  it('should work without any query string params', () => {
    const actual = createUrl('fake-url.com')
    expect(actual).toEqual('fake-url.com')
  })
})
