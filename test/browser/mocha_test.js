const assert = require('assert')
const selenium = require('selenium-webdriver')
const test = require('selenium-webdriver/testing')

test.describe('Test Access to CDE Main', () => {
  test.it('Finding CDE Main Div', () => {
    const driver = new selenium.Builder()
      .forBrowser('firefox')
      .usingServer('http://localhost:4444/wd/hub')
      .build()
    driver.get('http://localhost:6005')
    const body = driver.findElement(selenium.By.id('cde-main'))
    assert.notEqual(body, null)
    driver.quit()
  })
})
