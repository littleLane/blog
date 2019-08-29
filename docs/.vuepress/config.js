module.exports = {
  title: 'LittleLane',
  description: 'LittleLane的博客',
  base: '/blog/',
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'vuejs/vuepress',
    docsDir: 'docs',
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: '关于我',
        link: '/AboutMe/'
      }
    ],
    sidebar: [
      {
        title: 'CSS',
        collapsable: false,
        children: ['']
      },
      {
        title: 'JavaScript',
        collapsable: false,
        children: [
          '/JavaScript/0x00.md',
          '/JavaScript/0x01.md',
          '/JavaScript/0x02.md',
          '/JavaScript/0x03.md',
          '/JavaScript/0x04.md',
          '/JavaScript/0x05.md',
          '/JavaScript/0x06.md',
          '/JavaScript/0x07.md',
        ]
      },
      {
        title: 'DSA',
        collapsable: false,
        children: ['']
      },
      {
        title: 'Node.js',
        collapsable: false,
        children: ['']
      },
      {
        title: 'Tools',
        collapsable: false,
        children: [
          '/Tools/Vue-0x00.md',
          '/Tools/Vue-0x01.md',
          '/Tools/Vue-0x02.md',
          '/Tools/Vue-0x03.md',
          '/Tools/Vue-0x04.md',
          '/Tools/Vue-0x05.md',
          '/Tools/Vue-0x06.md',
          '/Tools/Vue-0x07.md',
          '/Tools/Vue-0x08.md',
          '/Tools/Vue-0x09.md',
          '/Tools/Vue-0x0A.md',
          '/Tools/Vue-0x0B.md',
        ]
      },
      {
        title: 'DailyQuestion',
        collapsable: false,
        children: [
          '/DailyQuestion/0x00.md',
          '/DailyQuestion/0x01.md',
          '/DailyQuestion/0x02.md',
          '/DailyQuestion/0x03.md',
          '/DailyQuestion/0x04.md',
          '/DailyQuestion/0x05.md',
        ]
      },
      {
        title: 'BestPractices',
        collapsable: false,
        children: ['']
      }
    ]
  }
};
