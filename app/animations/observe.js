export const IO = (element, options = {}) => {
  return new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          resolve(entry.target); 
          observer.unobserve(entry.target); 
        }
      });
    }, options);
    observer.observe(element);
  });
};
