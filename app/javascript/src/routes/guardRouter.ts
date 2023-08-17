import { useUserStore } from "../store/user";

const guardedRouter: void = (router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    userStore.attemp(localStorage.getItem('token')).then(() => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!userStore.isAuthenticated) {
          next({ path: '/signin' });
        } else {
          next();
        }
      }
      else if (to.matched.some(record => record.meta.forVisitorOnly)) {
        console.log('forVisitorOnly', userStore.isAuthenticated);
        if (!userStore.isAuthenticated) {
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