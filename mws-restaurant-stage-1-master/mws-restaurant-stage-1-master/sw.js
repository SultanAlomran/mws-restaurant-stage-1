let staticCacheName = "Cache-V1"


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(staticCacheName).then(function(cache) {
     return cache.addAll([
       '/',
       'index.html',
       'restaurant.html',
       '/css/styles.css',
       '/js/main.js',
       '/js/dbhelper.js',
       '/js/restaurant_info.js',
       '/data/restaurants.json',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = [staticCacheName];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
// self.addEventListener('fetch', 
// function(event) 
// {
//   event.respondWith
//   (    
//     caches.match(event.request)
//     .then
//     (
//       function(response) 
//       {
//         if (response !== undefined) 
//         {
//           return response;
//         } 
      
//         else 
//         {        
//           return fetch(event.request).then
//           (
//               function (response) 
//               {
//                 let responseClone = response.clone();
                
//                 caches.open(staticCacheName)
//                 .then
//                 (
//                   function (cache) 
//                   {
//                     cache.put(event.request, responseClone);
//                   }
//                 );
//                 return response;
//               }
//           );
//         }
//       }
//     ) // end of promise for cache match
      
//   ); // end of respond with

// }
    });