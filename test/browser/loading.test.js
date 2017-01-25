/* eslint no-undef: 0 */

const assert = require('assert')

console.log(browser.options)

describe('webdriver.io page', () => {
  it('should have the right title ', () => {
    browser.url(`https://crime-data-explorer.fr.cloud.gov`)
    assert.equal(browser.getUrl(), 'WebdriverIO')
  })
})
