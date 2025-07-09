import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const revealImage = () => {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const images = document.querySelectorAll("[data-animation='image']");

  images.forEach((item) => {
    gsap.set(item, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      visibility: "hidden"
    });

    gsap.to(item, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      visibility: "visible",
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: item,
        start: "top 70%",    
        toggleActions: "play none none none", 
       
      },
    });
  });
};
