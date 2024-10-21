// https://v3.nuxtjs.org/api/configuration/nuxt.config


import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    runtimeConfig: {
        // The private keys which are only available within server-side
        HOST: process.env.HOST || '0.0.0.0',
        // Keys within public, will be also exposed to the client-side
        public: {
            BACKEND_URL: process.env.BACKEND_URL || '127.0.0.1',
            WS_PORT: Number(process.env.WS_PORT) || 81,
            PORT: process.env.PORT || 80
        }
    },
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
    // buildModules: [
    //     '@nuxt/postcss8',
    //     // ...
    // ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    // vite: {
    //     server: {
    //         hmr: {
    //             protocol: 'ws',
    //             host: process.env.FRONTEND_URL,
    //             port: Number(process.env.PORT)
    //         }
    //     }
    // },
    css: [
        '@/assets/css/main.css',
    ],
})
