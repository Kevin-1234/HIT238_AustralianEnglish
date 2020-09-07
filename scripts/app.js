// if service worker is supported
//local environment
/*if('serviceWorker' in navigator){

  navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service worker registered!', reg))
    .catch((err) => console.log('service worker failed to register!', err));  
}*/



//github environment
/**/
if('serviceWorker' in navigator){

  navigator.serviceWorker.register('/HIT238_AustralianEnglish/sw.js')
    .then((reg) => console.log('service worker registered!', reg))
    .catch((err) => console.log('service worker failed to register!', err));  
}

