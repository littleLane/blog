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
    "revision": "309c31156c5f83bfcd8eb01830ae000a"
  },
  {
    "url": "about-me/index.html",
    "revision": "442d0be049a857213df929c550ad4892"
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
    "url": "assets/js/10.4f26371e.js",
    "revision": "45c1d28904c49b488c1b516a917abcb8"
  },
  {
    "url": "assets/js/11.5fc08974.js",
    "revision": "14d58a9f4d1f1bc66fc95a60d089fb66"
  },
  {
    "url": "assets/js/12.febcf240.js",
    "revision": "67879371c0101136e2c81294add38368"
  },
  {
    "url": "assets/js/2.2665dc80.js",
    "revision": "78cfb07cba6c8d4f65b896cf614b96e1"
  },
  {
    "url": "assets/js/3.a8d2d469.js",
    "revision": "2db54afabd086ee0e839f8c7e5ad07cf"
  },
  {
    "url": "assets/js/4.c28677d8.js",
    "revision": "ca0683c5d57d843e57a1179bde203fa1"
  },
  {
    "url": "assets/js/5.f54f92bc.js",
    "revision": "8a31a26541834fc200a016ab9fcefe2b"
  },
  {
    "url": "assets/js/6.f8a98ce1.js",
    "revision": "1bc101998421be6f4580d357bb3514f9"
  },
  {
    "url": "assets/js/7.21e6b279.js",
    "revision": "18fa3c628519b9d257c4561bf807e179"
  },
  {
    "url": "assets/js/8.c2186e59.js",
    "revision": "7ed9344649c4378358f758aef0152b7f"
  },
  {
    "url": "assets/js/9.ab7e62f7.js",
    "revision": "02b297854b1d357316fd12002005fa54"
  },
  {
    "url": "assets/js/app.1290185a.js",
    "revision": "a96ba80f31c1706efc26f6f286968731"
  },
  {
    "url": "daily/1.html",
    "revision": "ae95a83a3d35169ebfda69e2474894d4"
  },
  {
    "url": "daily/2.html",
    "revision": "14fe240ca4300efc314de50c0ad3859d"
  },
  {
    "url": "daily/3.html",
    "revision": "291ea8e120d95a13548e8ec3de910e98"
  },
  {
    "url": "daily/index.html",
    "revision": "9a0ba9d9a4a1aa88bfcd46a085cf8a6d"
  },
  {
    "url": "daily/vue/index.html",
    "revision": "ef234d6548cd8b424687c5e86fed902e"
  },
  {
    "url": "daily/vue/vue-component-communication.html",
    "revision": "87ee2fac1a6705a8ef688b5fa5ce8d25"
  },
  {
    "url": "index.html",
    "revision": "6fcc8d0562d451903ffbf0831947aa8a"
  },
  {
    "url": "serial/index.html",
    "revision": "a25ed0779e256d495a14f338b67e07a0"
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
