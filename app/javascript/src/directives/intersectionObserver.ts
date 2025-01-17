export default {
  mounted: (el, binding) => {
    const { delay, action, observerOptions } = binding.value;

    const callback = ([entry]) => {
      if (entry.isIntersecting) {
        if (binding.arg === true) {
          action();
        } else {
          observer.unobserve(el);
        }
      }
    };

    const createObserver = (callback, options) => {
      return new IntersectionObserver(callback, options);
    };

    const options = observerOptions
      ? observerOptions
      : {
          root: null,
          rootMargin: "0px",
          threshold: 1.0,
          delay: delay ? delay : 0,
        };

    let observer = createObserver(callback, options);

    observer.observe(el);
  },
};
