import MainPage from '../pages/MainPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import ListingPage from '../pages/ListingPage.vue'

export const routes = [
  { 
    path: '/',
    component: MainPage
  },
  {
    path: '/:category/list',
    component: ListingPage,
    props: true
  },
  { 
    path: '/signin',
    component: LoginPage
  },
  { 
    path: '/signup',
    component: RegistrationPage
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: NotFoundPage 
  }
];