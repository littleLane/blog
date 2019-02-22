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
                text: '日志类',
                link: '/daily/'
            },
            {
                text: '连载类',
                link: '/serial/'
            },
            {
                text: '关于我',
                link: '/about-me/'
            }
        ],
        sidebar: {

        }
    }
}

function genSidebarConfig (title) {
    return [
        {
            title,
            collapsable: false,
            children: [
                '',
                'getting-started',
                'basic-config',
                'assets',
                'markdown',
                'using-vue',
                'custom-themes',
                'i18n',
                'deploy'
            ]
        }
    ]
  }