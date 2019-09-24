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
    "revision": "d0e6864c7275158e0487fa02456a9541"
  },
  {
    "url": "about.html",
    "revision": "964299a9f9696fcce3547cf206f04df2"
  },
  {
    "url": "AboutMe/index.html",
    "revision": "e499ee2fade7f294fd9402ff9d65f944"
  },
  {
    "url": "assets/css/0.styles.fb084c9e.css",
    "revision": "2c8b21d91e82a5ae40822c7b0e0c535f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.7c696101.js",
    "revision": "d29dd013168c9322d9bb6f3a0c1fab21"
  },
  {
    "url": "assets/js/11.0789c73b.js",
    "revision": "eddc4532fe0e488620d4f824428067e5"
  },
  {
    "url": "assets/js/12.461a1f52.js",
    "revision": "edeb3952296bd77c9bc000f87e976cd6"
  },
  {
    "url": "assets/js/13.fe3225de.js",
    "revision": "4d8c9a1fa79bd41f64b480187875ab66"
  },
  {
    "url": "assets/js/14.90707970.js",
    "revision": "a85b26186c169733f1a637b24cdedb20"
  },
  {
    "url": "assets/js/15.fe5adc74.js",
    "revision": "e6fc4488bf78b5317595f993716c6a5c"
  },
  {
    "url": "assets/js/16.0ebb9344.js",
    "revision": "fad7f682721c1e0170b70d2480580598"
  },
  {
    "url": "assets/js/17.9ccc244d.js",
    "revision": "c8a36475ca6aa2ae30255e964070cb2f"
  },
  {
    "url": "assets/js/18.3280c375.js",
    "revision": "d186ff902688ea35adc2190677cbf784"
  },
  {
    "url": "assets/js/19.497df057.js",
    "revision": "4fbf91ac3016270042b275e3df7dc55f"
  },
  {
    "url": "assets/js/2.a2883561.js",
    "revision": "f057c0a772e8c01e7ceba3797f72d001"
  },
  {
    "url": "assets/js/20.32678c14.js",
    "revision": "f60449528a2b0a0face534139dc594f1"
  },
  {
    "url": "assets/js/21.1423f536.js",
    "revision": "0388f9da1755f5da6603bc561c8f8761"
  },
  {
    "url": "assets/js/22.f2e999a8.js",
    "revision": "c6d8eeca24de331fa631a72aeea51fb5"
  },
  {
    "url": "assets/js/23.ba5456dd.js",
    "revision": "69605a61830ee6a0fe5e4389c08ced5e"
  },
  {
    "url": "assets/js/24.506605c5.js",
    "revision": "bc3af3fc7d5d83593d2779e47a37e404"
  },
  {
    "url": "assets/js/25.a207ec0f.js",
    "revision": "340b2bb9f30ea0af170f7307a0377139"
  },
  {
    "url": "assets/js/26.2ef516a2.js",
    "revision": "e71a3be4bc49d755693b3a4aced39fa3"
  },
  {
    "url": "assets/js/27.0fc3d0a8.js",
    "revision": "1c83deb5999a4630e8b339d9bbe689f6"
  },
  {
    "url": "assets/js/28.857b9f54.js",
    "revision": "28eda95ce71ae73a5abba39600378dcb"
  },
  {
    "url": "assets/js/29.ddc54fa4.js",
    "revision": "28ccf15e728ffc31ef8bb6d0c2545521"
  },
  {
    "url": "assets/js/3.03546f42.js",
    "revision": "60c6ad5a97ee758cd758728fe4a88fa5"
  },
  {
    "url": "assets/js/30.d40e6ea0.js",
    "revision": "1be2908003a640ec9f7146006067ed0b"
  },
  {
    "url": "assets/js/31.1195eb55.js",
    "revision": "2940169356d58a1cae599d753b1cb2f2"
  },
  {
    "url": "assets/js/32.8de16a5a.js",
    "revision": "a2bf453ae579419d74a9d8ab7cf895dd"
  },
  {
    "url": "assets/js/33.7cd7fe57.js",
    "revision": "58035baa7c44aff472276331ec8dba8f"
  },
  {
    "url": "assets/js/34.738f5bc5.js",
    "revision": "68c2a8b9d61bbd9d44455ef67be210a7"
  },
  {
    "url": "assets/js/35.77dd47e7.js",
    "revision": "489410cf4e79caa8983b5bf6bffde94f"
  },
  {
    "url": "assets/js/36.352ec5b1.js",
    "revision": "f96095ca816dce08ebfc192fb27222f3"
  },
  {
    "url": "assets/js/37.13db91e9.js",
    "revision": "b1723058bbe2ecdd0c779832b7a8cae8"
  },
  {
    "url": "assets/js/38.c6fc1157.js",
    "revision": "743a895316106a99ac3acf17833975e7"
  },
  {
    "url": "assets/js/39.8c2096af.js",
    "revision": "043007b5a122a9d17d40989f8c0f267e"
  },
  {
    "url": "assets/js/4.230e5792.js",
    "revision": "356e2fdf229bcf4a42e812eafcd42392"
  },
  {
    "url": "assets/js/40.b2aa99ad.js",
    "revision": "47c462c744fec027a7aa621964e8150e"
  },
  {
    "url": "assets/js/41.b6c8edd8.js",
    "revision": "6a9062aa5a626f5833f4f3853c04e129"
  },
  {
    "url": "assets/js/42.44ad0cc7.js",
    "revision": "d2d5a87b34ebd4877648219b12257c1e"
  },
  {
    "url": "assets/js/43.fb6bd8dc.js",
    "revision": "123893c41918d6c0634a9ad6c9d68ccc"
  },
  {
    "url": "assets/js/44.f45a0bfd.js",
    "revision": "d88f9fac5c2c492920790fd766cb2d5e"
  },
  {
    "url": "assets/js/45.3ac2cc18.js",
    "revision": "4f13ebc8efc3a711bdab00a218f6cd34"
  },
  {
    "url": "assets/js/46.763aa6cb.js",
    "revision": "54ba6eec682c4ff59e6c3a5d1e61023e"
  },
  {
    "url": "assets/js/47.949030e9.js",
    "revision": "74a2aa3b94f7c47afcffb38c641e7455"
  },
  {
    "url": "assets/js/48.54ad9db1.js",
    "revision": "99d4d039a30f0db9087948092019a9a7"
  },
  {
    "url": "assets/js/5.e8583280.js",
    "revision": "17156e53655e9599c2e4c88826852bee"
  },
  {
    "url": "assets/js/6.34b724f6.js",
    "revision": "e5ba5aed36b1dbf0de4e171480767e84"
  },
  {
    "url": "assets/js/7.1c9ebf74.js",
    "revision": "910d60a9d27991a2bc17700161e9e84a"
  },
  {
    "url": "assets/js/8.928845ca.js",
    "revision": "a933a2c834f1c4e84c21c0e5f5f3d1ca"
  },
  {
    "url": "assets/js/9.aac799a8.js",
    "revision": "4453b453bdab88093979b76cab0ce481"
  },
  {
    "url": "assets/js/app.8628b115.js",
    "revision": "b4128e9512062921e2f8b71d5b6af9d2"
  },
  {
    "url": "BestPractices/index.html",
    "revision": "47fa39f666529134c24e84099e3a6491"
  },
  {
    "url": "CSS/index.html",
    "revision": "fe075226ee383ecfde8992ce30ca4a04"
  },
  {
    "url": "DailyQuestion/0x00.html",
    "revision": "b542546ad76aadd6cde0e7c6b47d0872"
  },
  {
    "url": "DailyQuestion/0x01.html",
    "revision": "902afcdb205cff0473910841f87cb0d3"
  },
  {
    "url": "DailyQuestion/0x02.html",
    "revision": "75dd0bc9fe08264c19853a89fe12e38f"
  },
  {
    "url": "DailyQuestion/0x03.html",
    "revision": "94973ab1f9a2ac23137491ec5b631e73"
  },
  {
    "url": "DailyQuestion/0x04.html",
    "revision": "85faf6c572158ff837cf9d5cb6e50778"
  },
  {
    "url": "DailyQuestion/0x05.html",
    "revision": "3410e854f86e1adb8c8111236d02d0c9"
  },
  {
    "url": "DailyQuestion/0x06.html",
    "revision": "2ef7e1dbac363859595e115bd6a5450d"
  },
  {
    "url": "DailyQuestion/0x07.html",
    "revision": "e8988f94eeb9c66f1fdfa914c92e26bd"
  },
  {
    "url": "DailyQuestion/index.html",
    "revision": "2ea98f96294d65208c862600be36d665"
  },
  {
    "url": "DSA/index.html",
    "revision": "8490012c17dd7962ef3d34773203e37b"
  },
  {
    "url": "headerPic.jpg",
    "revision": "51333c8bf548cfb8bc4d428eb893744c"
  },
  {
    "url": "index.html",
    "revision": "f2af458fec98153d96a55e6a514b7503"
  },
  {
    "url": "JavaScript/0x00.html",
    "revision": "84648f8485bf1bd79ea9132bde5c54a3"
  },
  {
    "url": "JavaScript/0x01.html",
    "revision": "77f6f6db30da0174705920d80358661b"
  },
  {
    "url": "JavaScript/0x02.html",
    "revision": "dcbb8cb7f06f35a1f27b4d80427cb929"
  },
  {
    "url": "JavaScript/0x03.html",
    "revision": "4d1ea23a96cba8abba1a07f106e1ed2a"
  },
  {
    "url": "JavaScript/0x04.html",
    "revision": "c611d46426f6435d57dc030c070990b1"
  },
  {
    "url": "JavaScript/0x05.html",
    "revision": "2e7b39a2bf4ba63a5e8cc25b08e76bd4"
  },
  {
    "url": "JavaScript/0x06.html",
    "revision": "61aee500a9032f924f45018f8feb4ed7"
  },
  {
    "url": "JavaScript/0x07.html",
    "revision": "affa54fd48a32053c51d647e550ef9bc"
  },
  {
    "url": "JavaScript/index.html",
    "revision": "14d59800a697dd3451812f7d04aececd"
  },
  {
    "url": "Node.js/index.html",
    "revision": "2a5d21c8d1ff6d89921c803cbed19dde"
  },
  {
    "url": "SafeOptimize/0x00.html",
    "revision": "be942c87b7cc6c789ac0970b00cfc17a"
  },
  {
    "url": "SafeOptimize/0x01.html",
    "revision": "99689ffcf44c828de62a426c72d9da76"
  },
  {
    "url": "SafeOptimize/0x02.html",
    "revision": "4ea81436218e834e682fe89dbd0f7173"
  },
  {
    "url": "SafeOptimize/0x03.html",
    "revision": "9254171c3e7bdd3d6eff19b0efa1c980"
  },
  {
    "url": "SafeOptimize/0x04.html",
    "revision": "d2c0b11bbb9da377935cde753d192f2e"
  },
  {
    "url": "SafeOptimize/0x05.html",
    "revision": "069e4d65c6e70cc8b1242213fa881317"
  },
  {
    "url": "SafeOptimize/index.html",
    "revision": "88fdeec523b04e7e7d4e8a4cfaa62f5a"
  },
  {
    "url": "Tools/index.html",
    "revision": "8da5d250223b91644a0c26f643068baa"
  },
  {
    "url": "Tools/Vue-0x00.html",
    "revision": "83f7444cde5e44fe99e153baa9ead102"
  },
  {
    "url": "Tools/Vue-0x01.html",
    "revision": "454d53d5356163c0db2d3fb66a06adf5"
  },
  {
    "url": "Tools/Vue-0x02.html",
    "revision": "5b32c2cf71f8da0e45fa17427d7e0619"
  },
  {
    "url": "Tools/Vue-0x03.html",
    "revision": "d2d1905b2f7dd4220ae69e8cef003f06"
  },
  {
    "url": "Tools/Vue-0x04.html",
    "revision": "e6147af0e344428eccc039df467ef561"
  },
  {
    "url": "Tools/Vue-0x05.html",
    "revision": "d330b3741b2aaaecb0981f0d84199a9b"
  },
  {
    "url": "Tools/Vue-0x06.html",
    "revision": "d4535777c49a9de849e25338f078c11c"
  },
  {
    "url": "Tools/Vue-0x07.html",
    "revision": "f27afcdc3502e42d421a5278bd19e2e0"
  },
  {
    "url": "Tools/Vue-0x08.html",
    "revision": "b118c00a7e651696db3e1c8ce5bd7974"
  },
  {
    "url": "Tools/Vue-0x09.html",
    "revision": "6aab6ca1d878ae21029ab8dcc250c41e"
  },
  {
    "url": "Tools/Vue-0x0A.html",
    "revision": "af0ba86a10b4eb5c9ff4184aea9d5ac3"
  },
  {
    "url": "Tools/Vue-0x0B.html",
    "revision": "a18528d0c9ed7a0dd223407a7ec4c981"
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
