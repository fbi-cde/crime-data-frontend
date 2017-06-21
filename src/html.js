import sharingMetaTags from './util/sharing'
import analytics from './util/analytics'

export default (content, state) =>
  `
  <!DOCTYPE html>
  <html lang='en'>
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'>
      <link rel='icon' type='image/png' sizes='32x32' href='/img/favicon.png'>
      ${sharingMetaTags(state)}
      <title>Crime Data Explorer</title>
      <link href='/app.css' rel='stylesheet'>
    </head>
    <body>
      <div id='app'>${content}</div>
      <script>
        window.__STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
      </script>
      <script src='/bundle.js'></script>
      ${process.env.NODE_ENV === 'production' ? analytics : ''}
    </body>
  </html>
`
