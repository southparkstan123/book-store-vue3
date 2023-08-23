import { createApp, defineComponent } from "vue";
import App from "@/App.vue";

// router
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/routes/routes.ts";
// guardedRouter
import guardedRouter from "@/routes/guardRouter";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// pinia
import { store } from "@/store/index";

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(App);
  guardedRouter(router);
  app.use(router);
  app.use(store);
  app.directive("on-change-table-view", (el, binding) => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const windowWidth = entry.contentRect.width;
        const isMobileView = entry.contentRect.width < binding.value.breakpoint;
        binding.value.action({ isMobileView, windowWidth });
      });
    });
    resizeObserver.observe(document.body);
  });
  app.mount("#app");
});
