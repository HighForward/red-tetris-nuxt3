import {defineNuxtPlugin} from '#app'
import Toast, {POSITION, useToast} from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(Toast, {
        position: POSITION.TOP_RIGHT,
    });
})