export const IO = (item, options) => {
  return new Promise((resolve) => {
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resolve(); 
          observer.unobserve(item); 
        }
      });
    }, options);

    observer.observe(item);
  });
};
