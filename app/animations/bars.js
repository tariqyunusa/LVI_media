import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const animateBars = () => {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const bars = document.querySelectorAll("[data-animation='bar']");

  bars.forEach((bar) => {
    gsap.set(bar, {
      width: "0rem",
    });

    gsap.to(bar, {
      width: "7.125rem", 
      duration: 1,
      ease: "power4.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: bar,
        start: "top 90%",
        toggleActions: "play none none none",
        // markers: true,
      },
    });
  });
};
