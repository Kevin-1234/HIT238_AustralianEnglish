//note: when sw.js file changes, close and the new service worker does not get activated automatically
//by defult, it gets activated after close and reopen the browser

// when assets get updated, cache should also be updated
// update cache name when updating the cache
const staticCacheName = 'site-static-v2';
// a list of references for assets that need to be added in to the cache
// local version
/*const assets = [
  '/',
  '/index.html',
  'scripts/app.js',
  'scripts/main.js',
  'scripts/js/materialize.min.js',
  'styles/main.css',
  'styles/css/materialize.min.css',
  'assets/images/Icon.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/assets/images/BackArrow.png',
  '/assets/images/I_Australia.ico',
  '/assets/images/L_Avo.png',
  '/assets/images/L_Banger.png',
  '/assets/images/L_DeadHorse.png',
  '/assets/images/L_DogEye.png',
  '/assets/images/L_FlatWhite.png'
];*/


// github version
const assets = [
  '/',
  '/HIT238_AustralianEnglish/index.html',
  '/HIT238_AustralianEnglish/manifest.json',
  '/HIT238_AustralianEnglish/sw.js',
  '/HIT238_AustralianEnglish/scripts/app.js',
  '/HIT238_AustralianEnglish/scripts/main.js',
  '/HIT238_AustralianEnglish/scripts/js/materialize.min.js',
  '/HIT238_AustralianEnglish/styles/main.css',
  '/HIT238_AustralianEnglish/styles/css/materialize.min.css',
  '/HIT238_AustralianEnglish/assets/images/Icon.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-18x18.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-24x24.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-72x72.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-96x96.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-128x128.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-144x144.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-152x152.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-192x192.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-384x384.png',
  '/HIT238_AustralianEnglish/assets/images/AE-Icon-512x512.png',
  '/HIT238_AustralianEnglish/assets/images/BackArrow.png',
  '/HIT238_AustralianEnglish/assets/images/I_Australia.ico',
  '/HIT238_AustralianEnglish/assets/images/L_Avo.png',
  '/HIT238_AustralianEnglish/assets/images/L_Banger.png',
  '/HIT238_AustralianEnglish/assets/images/L_DeadHorse.png',
  '/HIT238_AustralianEnglish/assets/images/L_DogEye.png',
  '/HIT238_AustralianEnglish/assets/images/L_FlatWhite.png',
  '/HIT238_AustralianEnglish/assets/images/L_Mash.png',
  '/HIT238_AustralianEnglish/assets/images/SB_Avo.png',
  '/HIT238_AustralianEnglish/assets/images/SB_Banger.png',
  '/HIT238_AustralianEnglish/assets/images/SB_DeadHorse.png',
  '/HIT238_AustralianEnglish/assets/images/SB_DogEye.png',
  '/HIT238_AustralianEnglish/assets/images/SB_FlatWhite.png',
  '/HIT238_AustralianEnglish/assets/images/SB_Mash.png',
  '/HIT238_AustralianEnglish/assets/images/Speaker.png',
  '/HIT238_AustralianEnglish/assets/audios/Avo.mp3',
  '/HIT238_AustralianEnglish/assets/audios/Banger.mp3',
  '/HIT238_AustralianEnglish/assets/audios/DeadHorse.mp3',
  '/HIT238_AustralianEnglish/assets/audios/DogEye.mp3',
  '/HIT238_AustralianEnglish/assets/audios/FlatWhite.mp3',
  '/HIT238_AustralianEnglish/assets/audios/Mash.mp3',
  '/HIT238_AustralianEnglish/styles/images/HomeBg.jpg',
  '/HIT238_AustralianEnglish/styles/images/Speaker.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];


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
self.addEventListener('fetch', evt => {
    
    evt.respondWith(
       // if the fetch requested item matches an item in the cache 
      caches.match(evt.request)
        // if the item is not in the cache, return the original fetch request
        .then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
  });    

