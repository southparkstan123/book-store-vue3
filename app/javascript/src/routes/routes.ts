import MainPage from "@/pages/MainPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import ListingPage from "@/pages/ListingPage.vue";
import EditPage from "@/pages/EditPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DashboardPage,
    meta: {
      requiresAuth: true,
      haveForm: false,
      forVisitorOnly: false,
    },
    children: [],
  },
  {
    path: "/media",
    component: MainPage,
    meta: {
      requiresAuth: true,
      haveForm: false,
      forVisitorOnly: false,
    },
    children: [],
  },
  {
    path: "/:category/list",
    component: ListingPage,
    props: true,
    meta: {
      requiresAuth: true,
      haveForm: false,
      forVisitorOnly: false,
    },
    children: [],
  },
  {
    path: "/:module/edit/:id",
    component: EditPage,
    props: true,
    meta: {
      haveForm: true,
      requiresAuth: true,
      forVisitorOnly: false,
    },
    children: [],
  },
  {
    path: "/:module/add",
    component: EditPage,
    props: true,
    meta: {
      haveForm: true,
      requiresAuth: true,
      forVisitorOnly: false,
    },
    children: [],
  },
  {
    path: "/signin",
    component: LoginPage,
    props: false,
    meta: {
      haveForm: false,
      requiresAuth: false,
      forVisitorOnly: true,
    },
  },
  {
    path: "/signup",
    component: RegistrationPage,
    meta: {
      forVisitorOnly: true,
      haveForm: false,
      requiresAuth: false,
    },
    children: [],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    meta: {
      forVisitorOnly: false,
      haveForm: false,
      requiresAuth: false,
    },
    children: [],
  },
];
