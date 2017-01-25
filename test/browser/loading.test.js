const webdriverio = require('webdriverio')

const options = {
  desiredCapabilities: {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.103',
  },
  services: ['sauce'],
  host: 'ondemand.saucelabs.com',
  port: 80,
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
}

webdriverio
  .remote(options)
  .init()
  .url(`http://127.0.0.1:${process.env.PORT}`)
  .waitForExist('#app', 2000)
  .getTitle()
  .then(title => console.log(`Title was: ${title}`))
  .end()
