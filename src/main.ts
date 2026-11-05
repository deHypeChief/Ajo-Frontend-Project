import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/tokens.css'
import './styles/base.css'


// createApp(App).use(router).mount('#app')
// createApp(App).use(createPinia()).mount('#app')
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
