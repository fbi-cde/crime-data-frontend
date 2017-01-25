module.exports.config = {
  desiredCapabilities: {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.103',
  },
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
  sauceConnectOpts: {
    tunnelIdentifier: process.env.CIRCLE_BUILD_NUM,
    verbose: true,
  },
  specs: ['test/browser/loading.test.js'],
}
