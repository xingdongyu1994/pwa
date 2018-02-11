'use strict';

var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = '/offline/'

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
     
      return cache.addAll([
          './img/beach.jpg',
      ].concat(offlineUrl))
    })
  )
})

this.addEventListener('fetch', event => {
  console.log("打印",event)
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
       console.log("是真")
        event.respondWith(
          fetch(event.request.url).catch(error => {
            return caches.match(offlineUrl);
          })
    )
  }
  else{
        event.respondWith(caches.match(event.request)
                        .then(function (response) {
                        return response || fetch(event.request);
                    })
            )
      }
})
