import { createApp } from "vue";
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

// Fontawesome
import {
  library,
  type IconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faPlus,
  faGear,
  faUserSecret,
  faDoorOpen,
  faBook,
  faPenNib,
  faBuilding,
  faRemove,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEdit } from "@fortawesome/free-regular-svg-icons";

library.add(faPlus as IconDefinition);
library.add(faGear as IconDefinition);
library.add(faUserSecret as IconDefinition);
library.add(faDoorOpen as IconDefinition);
library.add(faBook as IconDefinition);
library.add(faPenNib as IconDefinition);
library.add(faBuilding as IconDefinition);

library.add(faEye as IconDefinition);
library.add(faEdit as IconDefinition);
library.add(faRemove as IconDefinition);
library.add(faUpload as IconDefinition);

document.addEventListener("DOMContentLoaded", () => {
  const app = createApp(App);
  guardedRouter(router);
  app.use(router);
  app.use(store);
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.config.warnHandler = (msg, vm, trace) => null;
  app.mount("#app");
});
