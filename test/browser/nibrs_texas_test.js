const assert = require('assert')
const selenium = require('selenium-webdriver')
const test = require('selenium-webdriver/testing')

const port = process.env.PORT || 6005
const timeout = 15000
let driver


const defaultYr = 2016

test.before(() => {
  driver = new selenium.Builder()
    .forBrowser('firefox')
    .usingServer('http://localhost:4444/wd/hub')
    .build()
  driver.get(`http://localhost:${port}`)
})

test.describe('NIBRS Texas Test '+defaultYr, () => {
  test.it('Finding CDE Main Div', () => {
    driver.get('http://localhost:6005')
    const body = driver.findElement(selenium.By.id('cde-main'))
    assert.notEqual(body, null)
    const stateMapBtn = driver.findElement(selenium.By.id('TX'))
    stateMapBtn.click().then(() => {})
  });
    test.it('Verifying Texas Data is Displayed', () => {
      driver
        .wait(
          selenium.until.elementLocated(selenium.By.id('explorerHeaderTitle')),
          timeout
        )
        .getText()
        .then(text => {
          assert.equal(text, 'Texas')
        })
      })

      test.it('Verifying Texas NIBRS Participation Data', () => {
      driver
        .wait(
          selenium.until.elementLocated(selenium.By.id('selected-year-text')),
          timeout
        )
        .getText()
        .then(selectedYear => {
          assert.equal(
            selectedYear,
            defaultYr,
            `Invalid Year Selected, should be ${defaultYr}`
          )
        })

        driver
          .wait(
            selenium.until.elementLocated(
              selenium.By.id('explorerIntroStateParticipating')
            ),
            timeout
          )
          .getText()
          .then(agenciesNum => {
            assert.equal(
              agenciesNum,
              '1,057',
              'Inaccurate Rate Reported for Texas Participating Agencies'
            )
          })
            })


              test.it('Verifying Texas NIBRS Violent Crime Data', () => {
                driver
                  .wait(
                    selenium.until.elementLocated(
                      selenium.By.id('texas-trend-chart-details-row-rate')
                    ),
                    timeout
                  )
                  .getText()
                  .then(rate => {
                    assert.equal(
                      rate,
                      434.4,
                      'Inaccurate Rate Reported for TX Violent Crime for 2016'
                    )
                  })
                driver
                  .wait(
                    selenium.until.elementLocated(
                      selenium.By.id('texas-trend-chart-details-row-count')
                    ),
                    timeout
                  )
                  .getText()
                  .then(count => {
                    assert.equal(
                      count,
                      '121,042',
                      'Inaccurate Count Reported for TX Violent Crime for 2016'
                    )
                  })
                driver
                  .wait(
                    selenium.until.elementLocated(
                      selenium.By.id(
                        'texas-trend-chart-details-row-population'
                      )
                    ),
                    timeout
                  )
                  .getText()
                  .then(population => {
                    assert.equal(
                      population,
                      '27,862,596',
                      'Innccurate Population Reported for TX Violent Crime for 2016'
                    )
                  })
                })


              test.it('Navigating to TX Property-Crime', () => {
                driver.findElement(selenium.By.id('property-crime')).click().then(() => {})
                })


                      test.it('Verifying Texas NIBRS Property Crime Data', () => {
                        driver
                          .wait(
                            selenium.until.elementLocated(
                              selenium.By.id('texas-trend-chart-details-row-rate')
                            ),
                            timeout
                          )
                          .getText()
                          .then(rate => {
                            assert.equal(
                              rate,
                              '2,759.8',
                              'Inaccurate Rate Reported for TX Property Crime for 2016'
                            )
                          })
                        driver
                          .wait(
                            selenium.until.elementLocated(
                              selenium.By.id('texas-trend-chart-details-row-count')
                            ),
                            timeout
                          )
                          .getText()
                          .then(count => {
                            assert.equal(
                              count,
                              '768,947',
                              'Inaccurate Count Reported for TX Violent Crime for 2016'
                            )
                          })
                        driver
                          .wait(
                            selenium.until.elementLocated(
                              selenium.By.id(
                                'texas-trend-chart-details-row-population'
                              )
                            ),
                            timeout
                          )
                          .getText()
                          .then(population => {
                            assert.equal(
                              population,
                              '27,862,596',
                              'Innccurate Population Reported for TX Violent Crime for 2016'
                            )
                          })
                        })

                        test.it('Verifying US NIBRS Property Crime Data', () => {
                          driver
                            .wait(
                              selenium.until.elementLocated(
                                selenium.By.id('united-states-trend-chart-details-row-rate')
                              ),
                              timeout
                            )
                            .getText()
                            .then(rate => {
                              assert.equal(
                                rate,
                                '2,450.7',
                                'Inaccurate Rate Reported for USA Property Crime for 2016'
                              )
                            })
                          driver
                            .wait(
                              selenium.until.elementLocated(
                                selenium.By.id('united-states-trend-chart-details-row-count')
                              ),
                              timeout
                            )
                            .getText()
                            .then(count => {
                              assert.equal(
                                count,
                                '7,919,035',
                                'Inaccurate Count Reported for USA Property Crime for 2016'
                              )
                            })
                          driver
                            .wait(
                              selenium.until.elementLocated(
                                selenium.By.id(
                                  'united-states-trend-chart-details-row-population'
                                )
                              ),
                              timeout
                            )
                            .getText()
                            .then(population => {
                              assert.equal(
                                population,
                                '323,127,513',
                                'Innccurate Population Reported for USA Property Crime for 2016'
                              )
                            })
                          })
})
