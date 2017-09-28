const assert = require('assert')
const selenium = require('selenium-webdriver')
const test = require('selenium-webdriver/testing')

const port = process.env.PORT || 6005
const timeout = 15000
let driver
const defaultYr = 2015
test.before(() => {
  driver = new selenium.Builder()
    .forBrowser('firefox')
    .usingServer('http://localhost:4444/wd/hub')
    .build()

  driver.get(`http://localhost:${port}`)
})

test.describe('CDE Release Verification Test', () => {
  test.it('Finding CDE Main Div', () => {
    driver.get('http://localhost:6005')
    const body = driver.findElement(selenium.By.id('cde-main'))
    assert.notEqual(body, null)
    const stateMapBtn = driver.findElement(selenium.By.id('WV'))
    console.log('Navigating to State View')

    stateMapBtn.click().then(() => {})

    driver
      .wait(
        selenium.until.elementLocated(selenium.By.id('explorerHeaderTitle')),
        timeout,
      )
      .getText()
      .then(text => {
        assert.equal(text, 'West Virginia')
        driver
          .wait(
            selenium.until.elementLocated(selenium.By.id('selected-year-text')),
            timeout,
          )
          .getText()
          .then(selectedYear => {
            console.log(`selectedYear:${selectedYear}`)
            assert.equal(
              selectedYear,
              defaultYr,
              `Invalid Year Selected, should be ${defaultYr}`,
            )
          })

        driver
          .wait(
            selenium.until.elementLocated(
              selenium.By.id('west-virginia-trend-chart-details-row-rate'),
            ),
            timeout,
          )
          .getText()
          .then(rate => {
            console.log(`WV Rate:${rate}`)
            assert.equal(
              rate,
              337.9,
              'Inaccurate Rate Reported for WV Violent Crime for 2015',
            )
          })
        driver
          .wait(
            selenium.until.elementLocated(
              selenium.By.id('west-virginia-trend-chart-details-row-count'),
            ),
            timeout,
          )
          .getText()
          .then(count => {
            console.log(`WV Count:${count}`)
            assert.equal(
              count,
              '6,231',
              'Inaccurate Count Reported for WV Violent Crime for 2015',
            )
          })
        driver
          .wait(
            selenium.until.elementLocated(
              selenium.By.id(
                'west-virginia-trend-chart-details-row-population',
              ),
            ),
            timeout,
          )
          .getText()
          .then(population => {
            console.log(`WV population:${population}`)
            assert.equal(
              population,
              '1,844,128',
              'Innccurate Population Reported for WV Violent Crime for 2015',
            )
          })

        driver
          .findElement(selenium.By.css('#year-selected > option:nth-child(6)'))
          .click()
        driver
          .wait(
            selenium.until.elementLocated(selenium.By.id('selected-year-text')),
            timeout,
          )
          .getText()
          .then(selectedYear => {
            assert.equal(
              selectedYear,
              '2010',
              'Invalid Year Selected, should be 2010',
            )
          })

        driver
          .wait(
            selenium.until.elementLocated(selenium.By.id('agencySearchBtn')),
            timeout,
          )
          .then(selectedYear => {
            console.log('Navigating to Agency View')
            driver.findElement(selenium.By.id('agencySearchBtn')).click()
            driver.findElement(selenium.By.id('WV0170400')).click()
            driver
              .wait(
                selenium.until.elementLocated(
                  selenium.By.id('explorerHeaderTitle'),
                ),
                timeout,
              )
              .getText()
              .then(text => {
                assert.equal(text, 'Shinnston Police Department')
                driver
                  .wait(
                    selenium.until.elementLocated(
                      selenium.By.id('selected-year-text'),
                    ),
                    timeout,
                  )
                  .getText()
                  .then(selectedYear => {
                    assert.equal(
                      selectedYear,
                      defaultYr,
                      `Invalid Year Selected, should be ${defaultYr}`,
                    )
                    driver
                      .wait(
                        selenium.until.elementLocated(
                          selenium.By.id('reported-agency-chart-column'),
                        ),
                        timeout,
                      )
                      .getText()
                      .then(reported => {
                        assert.equal(
                          reported,
                          '6',
                          'Inaccurate Count Reported for WV0170400 Violent Crime for 2015',
                        )
                        console.log('Navigating to Documents and Downloads')
                        driver
                          .findElement(
                            selenium.By.id('downloads-and-docs-link-header'),
                          )
                          .click()
                        driver.quit()
                      })
                  })
              })
          })
      })
  })
})
