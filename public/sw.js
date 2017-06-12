const VERSION = 1
const CACHE = 'crime-data-explorer'

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      cache.addAll([
        '/cde-logo.png',
        '/fbi-logo.png',
        '/github.svg',
        '/twitter.svg',
        '/chevron-down-navy.svg',
        '/data/geo-usa-state.json',
        '/data/usa-state-svg.json',
      ])

      return Promise.all(
        ['/app.css', '/bundle.js'].map(url => {
          const busted = `${url}?${Math.random()}`
          return fetch(busted).then(response => {
            if (!response.ok) throw Error('Not ok')
            return cache.put(url, response)
          })
        }),
      )
    }),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      const promises = cacheNames
        .filter(cacheName => cacheName === CACHE)
        .map(cacheName => caches.delete(cacheName))

      return Promise.all(promises)
    }),
  )
})

self.addEventListener('fetch', event => {
  const sameOrigin = event.request.url.startsWith(self.location.origin)
  if (sameOrigin) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached

          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone())
            return response
          })
        }),
      ),
    )
  }
})
