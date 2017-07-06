import fs from 'fs'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'

import Disclaimer from '../src/components/Disclaimer'
import Footer from '../src/components/Footer'
import Header from '../src/components/Header'

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
      <link rel="stylesheet" href="/swagger/crime-data-style.css" />
    </head>
    <body>
      <div className="site">
        <Disclaimer />
        <Header location={{ pathname: '/api' }} />
        <main className="site-main">hello, world</main>
        <Footer actions={{}} />
      </div>
    </body>
  </html>
)

const dest = path.join(__dirname, '../public/swagger/index2.html')
const htmlStr = renderToString(html)

fs.writeFile(dest, htmlStr)
