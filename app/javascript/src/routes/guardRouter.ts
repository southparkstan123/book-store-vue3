import { useUserStore } from "@/store/user";

const guardedRouter: void = (router) => {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    userStore
      .attemp(localStorage.getItem("token"))
      .then(() => {
        const isAuthenticated = userStore.isAuthenticated;
        if (to.matched.some((record) => record.meta.requiresAuth)) {
          if (!isAuthenticated) {
            next({ path: "/signin" });
          } else {
            next();
          }
        } else if (to.matched.some((record) => record.meta.forVisitorOnly)) {
          if (!isAuthenticated) {
            next();
          } else {
            next({ path: "/" });
          }
        } else {
          next();
        }
      })
      .catch((error) => next({ path: "/signin" }));
  });
};

export default guardedRouter;
