const CACHE = 'crime-data-explorer'

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      cache.addAll([
        '/img/cde-logo.png',
        '/img/fbi-logo.png',
        '/img/loading.svg',
        '/img/github.svg',
        '/img/twitter.svg',
        '/img/chevron-down-navy.svg',
        '/data/geo-usa-state.json',
        '/data/usa-state-svg.json',
      ])

      return Promise.all(
        ['/app.css'].map(url => {
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
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(cacheName => cacheName === CACHE)
            .map(cacheName => caches.delete(cacheName)),
        ),
      )
      .then(() => self.clients.claim()),
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
