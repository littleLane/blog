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
    "revision": "c1d4c1028cf8cfa4f1a9a39fc9f706d4"
  },
  {
    "url": "about-me/index.html",
    "revision": "67d862520e7649a1dd34eea89eb1e8f2"
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
    "url": "assets/js/10.a23c3539.js",
    "revision": "dc17041d3d712543e33879f28aea9567"
  },
  {
    "url": "assets/js/11.f7f99814.js",
    "revision": "d87d87be086960ea4d7aa57e2255ec89"
  },
  {
    "url": "assets/js/12.13538cd5.js",
    "revision": "e564821b999f1c729c654b5faa61cb25"
  },
  {
    "url": "assets/js/13.86184b7a.js",
    "revision": "72fdcf0da0bb5c8424c860adb19ac37f"
  },
  {
    "url": "assets/js/2.8f862323.js",
    "revision": "e4b398d687e40a5eeaeb284f469d4a0f"
  },
  {
    "url": "assets/js/3.a8d2d469.js",
    "revision": "2db54afabd086ee0e839f8c7e5ad07cf"
  },
  {
    "url": "assets/js/4.11204425.js",
    "revision": "82abd457636ce24a5714b3bf35667317"
  },
  {
    "url": "assets/js/5.16a2a5f4.js",
    "revision": "090ab459e5e82c9b6e4587a956354826"
  },
  {
    "url": "assets/js/6.9ede1463.js",
    "revision": "5ea44aafa208ec0f2475961340a297b8"
  },
  {
    "url": "assets/js/7.1a98cda7.js",
    "revision": "cbac13e8e59492e8b2dd153259643845"
  },
  {
    "url": "assets/js/8.525a7685.js",
    "revision": "7f349e57efc21abdc4a11606a1f47b2c"
  },
  {
    "url": "assets/js/9.ec76d26a.js",
    "revision": "181956825d4191cdea33e8436ad8b2ee"
  },
  {
    "url": "assets/js/app.b8aa849a.js",
    "revision": "2e3eae82fa6fba93ad2fdc54d51a79ae"
  },
  {
    "url": "daily/1.html",
    "revision": "b8d7ac570d07271db46577577db8a310"
  },
  {
    "url": "daily/2.html",
    "revision": "e58d74400e2bca5c6f766fbcc449b61e"
  },
  {
    "url": "daily/3.html",
    "revision": "6b3925022247ca547b652fce3c9684c8"
  },
  {
    "url": "daily/4.html",
    "revision": "4962f4eab21dc2b502a18fcb1d0bc05a"
  },
  {
    "url": "daily/index.html",
    "revision": "cafab43402bdcaef1107a2ff72191eaa"
  },
  {
    "url": "daily/vue/index.html",
    "revision": "f548f786af8649741d3e0d03d02d09e6"
  },
  {
    "url": "daily/vue/vue-component-communication.html",
    "revision": "788ccba6cc4e02bf76e9651f795edbaf"
  },
  {
    "url": "index.html",
    "revision": "3e3f12733ba8e954d9e98d6eb9de5248"
  },
  {
    "url": "serial/index.html",
    "revision": "a20df32c20e57851609fa56bbf930c27"
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
