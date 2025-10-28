import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'


import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ContentLoader from './components/loaders/ContentLoader.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
app.component('ContentLoader', ContentLoader)


