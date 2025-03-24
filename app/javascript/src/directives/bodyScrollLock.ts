interface Binding {
  value: boolean;
}

export default (el: HTMLElement, binding: Binding) => {
  const isBodyScrollLock: boolean = binding.value as boolean;
  if (isBodyScrollLock === true) {
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "auto";
  }
};
