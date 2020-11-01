//note: when sw.js file changes, close and the new service worker does not get activated automatically
//by defult, it gets activated after close and reopen the browser

// when assets get updated, cache should also be updated
// update cache name when updating the cache
// notice if any of the items' url in the assets goes wrone, caching will be unsuccessful 
const staticCacheName = 'site-static-v1.6';
// a list of references for assets that need to be added in to the cache
// local version
const assets = [
  '/',
  '/index.html',
  'scripts/app.js',
  'scripts/main.js',
  'scripts/vendor/materialize.min.js',
  'styles/main.css',
  'styles/vendor/materialize.min.css',
  'assets/images/icon.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/assets/images/backarrow.png',
  '/assets/images/australia.ico',
  '/assets/images/l_avo.png',
  '/assets/images/l_banger.png',
  '/assets/images/l_deadhorse.png',
  '/assets/images/l_dogeye.png',
  '/assets/images/l_flatwhite.png'
];




// github version
// const assets = [
//   '/HIT238_AustralianEnglish/',
//   '/HIT238_AustralianEnglish/index.html',
//   '/HIT238_AustralianEnglish/manifest.json',
//   '/HIT238_AustralianEnglish/sw.js',
//   '/HIT238_AustralianEnglish/scripts/app.js',
//   '/HIT238_AustralianEnglish/scripts/main.js',
//   '/HIT238_AustralianEnglish/scripts/vendor/materialize.min.js',
//   '/HIT238_AustralianEnglish/styles/main.css',
//   '/HIT238_AustralianEnglish/styles/vendor/materialize.min.css',
//   '/HIT238_AustralianEnglish/styles/vendor/materialize.css',
//   '/HIT238_AustralianEnglish/assets/images/icon.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-18x18.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-24x24.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-72x72.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-96x96.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-128x128.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-144x144.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-152x152.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-192x192.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-384x384.png',
//   '/HIT238_AustralianEnglish/assets/images/ae-icon-512x512.png',
//   '/HIT238_AustralianEnglish/assets/images/backarrow.png',
//   '/HIT238_AustralianEnglish/assets/images/australia.ico',
//   '/HIT238_AustralianEnglish/assets/images/l_avo.png',
//   '/HIT238_AustralianEnglish/assets/images/l_banger.png',
//   '/HIT238_AustralianEnglish/assets/images/l_deadhorse.png',
//   '/HIT238_AustralianEnglish/assets/images/l_dogeye.png',
//   '/HIT238_AustralianEnglish/assets/images/l_flatwhite.png',
//   '/HIT238_AustralianEnglish/assets/images/l_mash.png',
//   '/HIT238_AustralianEnglish/assets/images/sb_avo.png',
//   '/HIT238_AustralianEnglish/assets/images/sb_banger.png',
//   '/HIT238_AustralianEnglish/assets/images/sb_deadhorse.png',
//   '/HIT238_AustralianEnglish/assets/images/sb_dogeye.png',
//   '/HIT238_AustralianEnglish/assets/images/sb_flatwhite.png',
//   '/HIT238_AustralianEnglish/assets/images/sb_mash.png',
//   '/HIT238_AustralianEnglish/assets/images/speaker.png',
//   '/HIT238_AustralianEnglish/assets/images/walk.png',
//   '/HIT238_AustralianEnglish/assets/images/throw.png',
//   '/HIT238_AustralianEnglish/assets/images/down.png',
//   '/HIT238_AustralianEnglish/assets/images/draw.png',
//   '/HIT238_AustralianEnglish/assets/images/go.png',
//   '/HIT238_AustralianEnglish/assets/audios/avo.mp3',
//   '/HIT238_AustralianEnglish/assets/audios/banger.mp3',
//   '/HIT238_AustralianEnglish/assets/audios/deadhorse.mp3',
//   '/HIT238_AustralianEnglish/assets/audios/dogeye.mp3',
//   '/HIT238_AustralianEnglish/assets/audios/flatwhite.mp3',
//   '/HIT238_AustralianEnglish/assets/audios/mash.mp3',
//   '/HIT238_AustralianEnglish/styles/images/homebackground.jpg',
//   '/HIT238_AustralianEnglish/styles/images/speaker.png',
//   'https://fonts.googleapis.com/icon?family=Material+Icons',
//   'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
// ];



// install event only fires when service worker has changed 
self.addEventListener('install', evt => {
    // use 'waitUntil' to make sure that it doesn't finish the 'install' event until the promise is resolved
    evt.waitUntil(
       // open a cache, if it doesn't exist, create it, then open 
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        // add all the assets defined into the cache
        cache.addAll(assets);
      })
    );
  });

  // activate event
self.addEventListener('activate', evt => {
    
    evt.waitUntil(
        // getting an array of cache names (keys)
      caches.keys().then(keys => {
        // 'promise.all' takes an array of promises
        return Promise.all(keys
          // filter the key array
          // if the key is not equal to the current cache name, it stays in the array        
          .filter(key => key !== staticCacheName)
          // map the leftover array to an array of promises 
          // delete each key in the leftover array
          .map(key => caches.delete(key))
        );
      })
    );
  });

// fetch event
// self.addEventListener('fetch', evt => {
    
//     evt.respondWith(
//        // if the fetch requested item matches an item in the cache 
//       caches.match(evt.request)
//         // if the item is not in the cache, return the original fetch request
//         .then(cacheRes => {
//             return cacheRes || fetch(evt.request);
//         })
//     );
//   });    

