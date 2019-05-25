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
    "revision": "3f9866c134bcf8ad28868cf7855ebf4f"
  },
  {
    "url": "about.html",
    "revision": "8dbacf45cfa7950ce26cf4fd4f76d544"
  },
  {
    "url": "AboutMe/index.html",
    "revision": "11f26212c705622216f5bcaa7044e9b7"
  },
  {
    "url": "assets/css/0.styles.534724aa.css",
    "revision": "2c8b21d91e82a5ae40822c7b0e0c535f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.0e30b8c8.js",
    "revision": "ae4c72a00d85ead09f3e6edad594f042"
  },
  {
    "url": "assets/js/11.5a6a5db8.js",
    "revision": "c634418463d5f6bc1588fec7ea36e02e"
  },
  {
    "url": "assets/js/12.7bd470ab.js",
    "revision": "847ace87926568696e292bb1007db3d4"
  },
  {
    "url": "assets/js/13.0ae28513.js",
    "revision": "2bbffaa38a91ad86ccb801ff1200ab86"
  },
  {
    "url": "assets/js/14.4baadd4e.js",
    "revision": "485ca68c0d9cb0d56eb99f85443bbd0b"
  },
  {
    "url": "assets/js/15.50ce5b1d.js",
    "revision": "44e4e1c2e468e4d32d15b0514a3b199d"
  },
  {
    "url": "assets/js/16.d3e0de1e.js",
    "revision": "f40c819706427a8dafe2fc0ed5092673"
  },
  {
    "url": "assets/js/17.7e8fc686.js",
    "revision": "924dedc1fe805c63692413dea746ad9f"
  },
  {
    "url": "assets/js/18.888a3ea9.js",
    "revision": "16da124f963c2534d34533030b11199d"
  },
  {
    "url": "assets/js/2.bfb8b7fa.js",
    "revision": "79878a3032088f9731cbe99419757825"
  },
  {
    "url": "assets/js/3.33ad0fda.js",
    "revision": "a42268cfe8253cc8885f45b6ec77491c"
  },
  {
    "url": "assets/js/4.328fd132.js",
    "revision": "545e26fe2f36930df0e781917b79991e"
  },
  {
    "url": "assets/js/5.9898dc23.js",
    "revision": "a0b6eedd24862505d4b9ad602153ded6"
  },
  {
    "url": "assets/js/6.53a28f3d.js",
    "revision": "07ceeb5a0341ee767b6a0198482cdc03"
  },
  {
    "url": "assets/js/7.f8fe95fd.js",
    "revision": "dcfe99d6f2e64f4dfc95e84934a47f9b"
  },
  {
    "url": "assets/js/8.30b9f03c.js",
    "revision": "ca6f97d0ba3caa79ba2920a2aabc2af7"
  },
  {
    "url": "assets/js/9.8fd87e9a.js",
    "revision": "90237be1a7d3f1ee4474b3e24d7e5f30"
  },
  {
    "url": "assets/js/app.0854d285.js",
    "revision": "489bec0f2b3c74408bb620911341081c"
  },
  {
    "url": "BestPractices/index.html",
    "revision": "c8acb3e8d8ae7c4823dfa793334ca0a8"
  },
  {
    "url": "CSS/index.html",
    "revision": "0e2edbc4e7ad1fe26da832c327312ed9"
  },
  {
    "url": "DailyQuestion/0x00.html",
    "revision": "8a9ee27dc63c0148a275ccd4d213cb1a"
  },
  {
    "url": "DailyQuestion/0x01.html",
    "revision": "dff81c4e681601ea3afc86f1fcc935c3"
  },
  {
    "url": "DailyQuestion/index.html",
    "revision": "c766b3dfc55aa2d0b5e91f9e6b7261d9"
  },
  {
    "url": "DSA/index.html",
    "revision": "3cdb49a1654d0393d11b8a365953029a"
  },
  {
    "url": "index.html",
    "revision": "2fe4980018d4fcca71f10b07ebe59e86"
  },
  {
    "url": "JavaScript/0x00.html",
    "revision": "0e522d801c215504cb3e969025216f2a"
  },
  {
    "url": "JavaScript/index.html",
    "revision": "968761483f676f88e0213fc32d91565e"
  },
  {
    "url": "Node.js/index.html",
    "revision": "a79395938289b22ad11883d15b16a556"
  },
  {
    "url": "Tools/index.html",
    "revision": "8980e1465f7a192cce506711abe9ccb2"
  },
  {
    "url": "Tools/Vue-0x00.html",
    "revision": "bf9665c0fd741dc61892387127020252"
  },
  {
    "url": "Tools/Vue-0x01.html",
    "revision": "155ddc1fe26c877bbd6d2a88cde30527"
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
