export default defineNuxtRouteMiddleware((to) => {
    const { $client } = useNuxtApp()
    console.log(`web-socket middleware: connected ? ${$client?.connected}`)

    if (!$client?.connected) {
        console.log(`web-socket middleware: connected ? ${$client?.connected}`)
        navigateTo('/')
    }

})
