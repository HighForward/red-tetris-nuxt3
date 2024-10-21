// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Hub from "@/views/Hub.vue";
import Games from "@/views/Games.vue";
import Play from "@/views/Play.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
    }, {
        path: '/hub',
        name: 'hub',
        component: Hub,
    },{
        path: '/games',
        name: 'games',
        component: Games,
    },{
        path: '/play',
        name: 'play',
        component: Play,
    }],
})

export default router
