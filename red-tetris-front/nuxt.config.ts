// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=500, initial-scale=1',
            title: 'RED-TETRIS',
            meta: [
                { name: '42 Red Tetris Project', content: '' }
            ],
        }
    },
    typescript: {
        strict: true
    },
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    css: [
        '@/assets/css/main.css',
    ],
})
