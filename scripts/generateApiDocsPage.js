import fs from 'fs'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'

import Disclaimer from '../src/components/Disclaimer'
import FooterApiDocs from '../src/components/FooterApiDocs'
import HeaderApiDocs from '../src/components/HeaderApiDocs'

const html = (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Crime Data API Documentation</title>
      <link
        rel="stylesheet"
        href="/swagger/vendor/css/reset.css"
        media="screen"
      />
      <link
        rel="stylesheet"
        href="/swagger/vendor/css/screen.css"
        media="screen"
      />
      <link rel="stylesheet" href="/app.css" />
      <link rel="stylesheet" href="/swagger/custom.css" />
    </head>
    <body>
      <div className="site">
        <Disclaimer />
        <HeaderApiDocs />
        <main className="site-main">
          <div className="swagger-section container mx-auto px1 my6">
            <form className="bg-white hide p3" id="api-key-container">
              <div>
                <label className="block bold mb1 serif" htmlFor="api-key">
                  Add your API key
                </label>
                <input
                  className="border border-blue col-6 monospace"
                  type="text"
                  id="api-key"
                />
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
              <p className="mb0 mt1">
                You can signup for one at{' '}
                <a className="underline" href="https://api.data.gov/signup/">
                  https://api.data.gov/signup/
                </a>.
              </p>
              <div className="hide" id="api-key-current">
                <span className="bold">Current API key:</span>
                <span className="monospace mr1" id="current" />
              </div>
            </form>
            <div className="swagger-ui-wrap" id="swagger-ui">
              <div className="mt3 mb8 fs-14 caps sans-serif center">
                <img
                  className="align-middle mr1"
                  width="30"
                  height="30"
                  src="/img/loading.svg"
                  alt="loading..."
                />
                <span>Loading...</span>
              </div>
            </div>
          </div>
        </main>
        <FooterApiDocs />
      </div>
      <script src="/swagger/vendor/lib/object-assign-pollyfill.js" />
      <script src="/swagger/vendor/lib/jquery-1.8.0.min.js" />
      <script src="/swagger/vendor/lib/jquery.slideto.min.js" />
      <script src="/swagger/vendor/lib/jquery.wiggle.min.js" />
      <script src="/swagger/vendor/lib/jquery.ba-bbq.min.js" />
      <script src="/swagger/vendor/lib/handlebars-4.0.5.js" />
      <script src="/swagger/vendor/lib/lodash.min.js" />
      <script src="/swagger/vendor/lib/backbone-min.js" />
      <script src="/swagger/vendor/swagger-ui.js" />
      <script src="/swagger/vendor/lib/highlight.9.1.0.pack.js" />
      <script src="/swagger/vendor/lib/highlight.9.1.0.pack_extended.js" />
      <script src="/swagger/vendor/lib/jsoneditor.min.js" />
      <script src="/swagger/vendor/lib/marked.js" />
      <script src="/swagger/vendor/lib/swagger-oauth.js" />
      <script src="/swagger/init.js" />
    </body>
  </html>
)

const dest = path.join(__dirname, '../public/swagger/index.html')
const htmlStr = renderToString(html)

fs.writeFile(dest, htmlStr)
