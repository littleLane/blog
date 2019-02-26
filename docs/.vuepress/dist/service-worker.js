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
    "revision": "4472b091a6b28f47c98224b61582cb7f"
  },
  {
    "url": "about-me/index.html",
    "revision": "9cc2dcf4475a3f8b5ec4a13f753ac9af"
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
    "url": "assets/js/10.0ce02077.js",
    "revision": "d28dabf025bd71bf56d7c43a6a419949"
  },
  {
    "url": "assets/js/11.87f81726.js",
    "revision": "f2328d8f73e1e54461d4c6e2077732b0"
  },
  {
    "url": "assets/js/2.ae0495de.js",
    "revision": "26c0d21f8bf42c84a70ad5d8f694b7a3"
  },
  {
    "url": "assets/js/3.0e9722d8.js",
    "revision": "5b4fa3f9e3bc7fe55702ba63c3ff0bfd"
  },
  {
    "url": "assets/js/4.4a711973.js",
    "revision": "4852e9671412c342a3e4e8428d714c4a"
  },
  {
    "url": "assets/js/5.f060ef5f.js",
    "revision": "a3f81266fc1236be0ee59a1398c4ecd7"
  },
  {
    "url": "assets/js/6.846b3b58.js",
    "revision": "97884feadba34ac4021158790ff83b5f"
  },
  {
    "url": "assets/js/7.72f9828b.js",
    "revision": "6f370e45cba494930370829b1ab493c9"
  },
  {
    "url": "assets/js/8.9368b743.js",
    "revision": "ecf62a3e3aae429b14e2df121791594c"
  },
  {
    "url": "assets/js/9.e524be51.js",
    "revision": "8d397231ab0a1d56dc53de08a8a8cbe7"
  },
  {
    "url": "assets/js/app.90e78ddd.js",
    "revision": "4d6205524e6c50601681e7841f7e232f"
  },
  {
    "url": "daily/1.html",
    "revision": "0a42a2649a9c3fc0a8aad0ef22cc49b3"
  },
  {
    "url": "daily/2.html",
    "revision": "0efe9abf29f4693e8e1418621952b611"
  },
  {
    "url": "daily/index.html",
    "revision": "1170547e1872d869a29b7848184bc305"
  },
  {
    "url": "daily/vue/index.html",
    "revision": "82493eba1ca86407cb2fbee188d2e059"
  },
  {
    "url": "daily/vue/vue-component-communication.html",
    "revision": "975ff534c09c9541b403c065f4f12c1d"
  },
  {
    "url": "index.html",
    "revision": "c18c69225a1da3b1219f0342ba4d7444"
  },
  {
    "url": "serial/index.html",
    "revision": "d00b7ba0faea7dbc4eefc52131bb2b57"
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
