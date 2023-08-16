import { createApp, defineComponent } from 'vue'
import App from './components/App.vue'

// router
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes/routes.ts'

// pinia
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App)
  app.use(router)
  app.use(pinia)
  app.mount('#app')
})
