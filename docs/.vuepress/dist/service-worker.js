/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "6f0a34997c5cd186956ea702e5730867"
  },
  {
    "url": "about-me/index.html",
    "revision": "f0e4a73dcba9a75ac0af3e782e868f89"
  },
  {
    "url": "assets/css/0.styles.56a79c8a.css",
    "revision": "958e2694b1b8842df5709c73c958b1e2"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5df618e8.js",
    "revision": "ea038cd2238b8aff048b1a3f00fe4570"
  },
  {
    "url": "assets/js/2.ae0495de.js",
    "revision": "26c0d21f8bf42c84a70ad5d8f694b7a3"
  },
  {
    "url": "assets/js/3.22594c62.js",
    "revision": "b8e4fcb17495b392cae37c9d93ae98bb"
  },
  {
    "url": "assets/js/4.b6bfc73b.js",
    "revision": "a27a66f0fa5ef8e3f366deccc619a5dd"
  },
  {
    "url": "assets/js/5.ba9e44d3.js",
    "revision": "bfbcb4c598f7bfa52f745900ddaf69e8"
  },
  {
    "url": "assets/js/6.d0097504.js",
    "revision": "f8859da56d97d187162eafbefd972c6e"
  },
  {
    "url": "assets/js/7.d6812106.js",
    "revision": "7f0503908e5adec515d123353162f5ff"
  },
  {
    "url": "assets/js/8.bf937e62.js",
    "revision": "93a0e4f12c9bdaa1db167e1dcd34bb88"
  },
  {
    "url": "assets/js/9.b689da51.js",
    "revision": "3d81db9f58d311e215e123db03a94e81"
  },
  {
    "url": "assets/js/app.3d7d040d.js",
    "revision": "7dd1b1f188d1cfcecdd0421f4596ac96"
  },
  {
    "url": "daily/1.html",
    "revision": "cd81874e1067fe20913c1785d8296ac0"
  },
  {
    "url": "daily/index.html",
    "revision": "c5dde3ae1dbd126c6d3b4d985865cde1"
  },
  {
    "url": "daily/vue/index.html",
    "revision": "c5a4c39c5e4e8264eff6801de53800fb"
  },
  {
    "url": "daily/vue/vue-component-communication.html",
    "revision": "ffb6b5ae60c7d3013c29587475b43613"
  },
  {
    "url": "index.html",
    "revision": "37275d27dd355afca8ee1002c7b12cb1"
  },
  {
    "url": "serial/index.html",
    "revision": "e1c0b800760f95444747f1f671d0e41a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
