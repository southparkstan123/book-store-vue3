import { useUserStore } from "../store/user";

const guardedRouter: void = (router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const isAuthenticated = userStore.state.userInfo !== null && userStore.state.token !== null
    userStore.attemp(localStorage.getItem('token')).then(() => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
          next({ path: '/signin' });
        } else {
          next();
        }
      }
      else if (to.matched.some(record => record.meta.forVisitorOnly)) {
        console.log('forVisitorOnly', isAuthenticated);
        if (!isAuthenticated) {
          next();
        } else {
          next({ path: '/' });
        }
      } else {
        next();
      }
    }).catch(error => next({ path: '/signin' }))

  });
};

export default guardedRouter;