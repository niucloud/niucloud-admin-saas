import useSystemStore from '~/stores/system'
import Language from '~~/utils/language'

export default defineNuxtRouteMiddleware((to, from) => {
    const language = new Language(useNuxtApp().$getI18n())
    language.loadLocaleMessages(to.meta.addon || 'app', to.path, useSystemStore().lang)
})
