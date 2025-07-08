import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const animateBars = () => {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const bars = document.querySelectorAll("[data-animation='bar']");

  bars.forEach((bar) => {
    gsap.set(bar, {
      scaleX: 0,
    });

    gsap.to(bar, {
      scaleX: 1, 
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
