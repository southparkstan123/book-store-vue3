import MainPage from '../pages/MainPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'
import ListingPage from '../pages/ListingPage.vue'
import EditPage from '../pages/EditPage.vue'

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
    path: '/:module/edit/:id',
    component: EditPage,
    props: true,
    meta: {
      haveForm: true
    }
  },
  {
    path: '/:module/add',
    component: EditPage,
    props: true,
    meta: {
      haveForm: true
    }
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