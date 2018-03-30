const urlFetch = [
  '/',
  '/css/styles.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json'
];

/* Loop thru the ids to get images and restaurant.html.
Makes it easier to add more restaurants later. */
for (let i = 1; i <= 10; i++) {
   urlFetch.push('restaurant.html?id='+i);
   urlFetch.push('/img/'+i+'.jpg');
}

// Install State
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-app-index').then(function(cache) {
      console.log('SW: Installed');
      return cache.addAll(urlFetch);
    })
  );
});

// Activate State
self.addEventListener('activate', function(event){
  console.log('SW: Activated');
});

// Cache and throwback requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) { 
        return response;
      }
      return fetch(event.request);
    })
  );
});