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
        children: ['']
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
          '/Tools/Vue-0x01.md'
        ]
      },
      {
        title: 'DailyQuestion',
        collapsable: false,
        children: [
          '/DailyQuestion/0x00.md',
          '/DailyQuestion/0x01.md',
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
