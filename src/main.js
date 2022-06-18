import { createApp } from 'vue'
import App from './App'
import router from './router'
import i18n from './plugins/i18n'
import { createPinia } from 'pinia'

createApp(App).use(i18n).use(router).use(createPinia()).mount('#app')
