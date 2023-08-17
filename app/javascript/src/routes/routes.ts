import MainPage from '../pages/MainPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import ListingPage from '../pages/ListingPage.vue'
import EditPage from '../pages/EditPage.vue'

export const routes = [
  { 
    path: '/',
    component: MainPage,
    meta: { 
      requiresAuth: true 
    }
  },
  {
    path: '/:category/list',
    component: ListingPage,
    props: true,
    meta: { 
      requiresAuth: true 
    }
  },
  {
    path: '/:module/edit/:id',
    component: EditPage,
    props: true,
    meta: {
      haveForm: true,
      requiresAuth: true 
    }
  },
  {
    path: '/:module/add',
    component: EditPage,
    props: true,
    meta: {
      haveForm: true,
      requiresAuth: true 
    }
  },
  { 
    path: '/signin',
    component: LoginPage,
    meta: {
      forVisitorOnly: true
    }
  },
  { 
    path: '/signup',
    component: RegistrationPage,
    meta: {
      forVisitorOnly: true
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: NotFoundPage 
  }
];