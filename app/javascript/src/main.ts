import { createApp, defineComponent } from 'vue'
import App from './components/App.vue'

import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes
})

document.addEventListener('DOMContentLoaded', () => {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
})
