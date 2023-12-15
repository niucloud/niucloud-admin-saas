export default defineNuxtRouteMiddleware((to, from) => {
    if (!getToken()) {
        useLogin().setLoginBack(to)
        return navigateTo('/auth/login')
    }
})