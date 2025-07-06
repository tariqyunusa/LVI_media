import gsap from "gsap";
import SplitText from "gsap/SplitText"; 
gsap.registerPlugin(SplitText)
import { IO } from "./observe"; 

export const split = () => {
  const paragraphs = document.querySelectorAll("[data-animation='paragraph']");

  paragraphs.forEach((el) => {
    if (el.dataset.split === "true") return;

    const splitInstance = new SplitText(el, {
      type: "lines",
      linesClass: "line",
    });

    el.dataset.split = "true";

    splitInstance.lines.forEach((line) => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("text__wrap");

      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    const targets = el.querySelectorAll(".text__wrap .line");

    gsap.set(targets, {
      yPercent: 100,
      opacity: 0,
    });

    IO(el, { threshold: 0.4 }).then(() => {
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });
    });
  });
};
