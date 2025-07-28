import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const fadeInElements = () => {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll("[data-animation='fade']");

  elements.forEach((el, index) => {
    gsap.set(el, {
      opacity: 0,
      y: 50, 
      visibility: "hidden"
    });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      visibility: "visible",
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
};
