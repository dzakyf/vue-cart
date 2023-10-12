import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { createPinia } from 'pinia'


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(CoreuiVue)


app.mount('#app')
