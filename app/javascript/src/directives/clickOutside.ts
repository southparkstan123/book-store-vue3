export default {
  beforeMount: (el: HTMLElement, binding) => {
    const { action } = binding.value;
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        action();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};
