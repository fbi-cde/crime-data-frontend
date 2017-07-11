/* eslint-disable func-names, no-sequence, no-undef */
import React from 'react'

class Analytics extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      this.addGA()
      this.addDAP()
    }
  }

  addDAP = () => {
    const script = document.createElement('script')
    script.src =
      'https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js'
    script.id = '_fed_an_ua_tag'
    document.body.appendChild(script)
  }

  addGA = () => {
    !(function(a, b, c, d, e, f, g) {
      ;(a.GoogleAnalyticsObject = e), (a[e] =
        a[e] ||
        function() {
          ;(a[e].q = a[e].q || []).push(arguments)
        }), (a[e].l = 1 * new Date()), (f = b.createElement(
        c,
      )), (g = b.getElementsByTagName(
        c,
      )[0]), (f.async = 1), (f.src = d), g.parentNode.insertBefore(f, g)
    })(
      window,
      document,
      'script',
      'https://www.google-analytics.com/analytics.js',
      'ga',
    ), ga('create', 'UA-48605964-47', 'auto'), ga(
      'require',
      'urlChangeTracker',
    ), ga('set', 'anonymizeIp', !0), ga('set', 'forceSSL', !0), ga(
      'send',
      'pageview',
    )
  }

  render() {
    return <div />
  }
}

export default Analytics
