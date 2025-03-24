interface ClickOutsideBinding {
  value: {
    action: () => void;
  };
}

interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void;
}

export default {
  beforeMount: (
    el: HTMLElementWithClickOutside,
    binding: ClickOutsideBinding,
  ) => {
    const { action } = binding.value;
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        action();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: HTMLElementWithClickOutside) => {
    if (el.clickOutsideEvent) {
      document.removeEventListener("click", el.clickOutsideEvent);
    }
  },
};
