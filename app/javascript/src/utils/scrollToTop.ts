const scrollToTop = (behavior: ScrollBehavior = "auto", delayInMs: number = 0) => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior
    });
  }, delayInMs);
};

export default scrollToTop;