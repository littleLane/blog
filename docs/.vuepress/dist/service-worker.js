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
    "revision": "62ba6025b1d80837e6b1611ff4080194"
  },
  {
    "url": "about-me/index.html",
    "revision": "7364bcb9681960a7d295f98b345d58c5"
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
    "url": "assets/js/3.22594c62.js",
    "revision": "b8e4fcb17495b392cae37c9d93ae98bb"
  },
  {
    "url": "assets/js/4.5f33e655.js",
    "revision": "a1661e6e474ede9c3427f1280dc6d2eb"
  },
  {
    "url": "assets/js/5.023690fa.js",
    "revision": "562c3d6e65a6de08ff983ca5b53d9d11"
  },
  {
    "url": "assets/js/6.1a882952.js",
    "revision": "1fdcf613690bf801cf529815db8d6177"
  },
  {
    "url": "assets/js/7.807ca806.js",
    "revision": "307731d333370a5be79302715d89152c"
  },
  {
    "url": "assets/js/8.2591f39c.js",
    "revision": "f0e5a539e6f764621f9de104c8fb71e1"
  },
  {
    "url": "assets/js/app.45148ccb.js",
    "revision": "73a0e19448181a0ce24266fb7c8a0cd8"
  },
  {
    "url": "daily/index.html",
    "revision": "e888a5b105f1ad0c1b09b3256476bad2"
  },
  {
    "url": "daily/vue/vue-component-communication.html",
    "revision": "526a0a0e2c42b9f11dc588a9791f0d0b"
  },
  {
    "url": "index.html",
    "revision": "2c83692151b36fd1fd1fbd397d34f314"
  },
  {
    "url": "serial/index.html",
    "revision": "d27019ab0e27efaa5e68593040ee9b6f"
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
