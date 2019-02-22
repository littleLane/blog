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
    "revision": "3e1070e9c27b3c9b5e238128298aa229"
  },
  {
    "url": "about-me/index.html",
    "revision": "e83ce60a04c9c3598f5f5c75ba139ee8"
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
    "url": "assets/js/2.ae0495de.js",
    "revision": "26c0d21f8bf42c84a70ad5d8f694b7a3"
  },
  {
    "url": "assets/js/3.f12f18d1.js",
    "revision": "faf3e3df0833bbd5d0768780a017a363"
  },
  {
    "url": "assets/js/4.b6bfc73b.js",
    "revision": "a27a66f0fa5ef8e3f366deccc619a5dd"
  },
  {
    "url": "assets/js/5.be87e03e.js",
    "revision": "9c08cf30f0bf169f798d84cdaab18a71"
  },
  {
    "url": "assets/js/6.d28ae7b8.js",
    "revision": "6a75372fbe75a49076b8b0a21b641f7a"
  },
  {
    "url": "assets/js/7.2d59abf1.js",
    "revision": "1cbbc651635bd574592dc49916e61b89"
  },
  {
    "url": "assets/js/app.947ab20c.js",
    "revision": "66bafef6df2374a6fbbe438feef8d80d"
  },
  {
    "url": "daily/index.html",
    "revision": "9dfbfbd955f8cce1699a67fd9e6cf435"
  },
  {
    "url": "index.html",
    "revision": "79614ca27e7b5b9106af9a8d80cbc4b9"
  },
  {
    "url": "serial/index.html",
    "revision": "932716d87dfc3af82b10ddde223f4048"
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
