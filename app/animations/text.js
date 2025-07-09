import gsap from "gsap";
import SplitText from "gsap/SplitText";
import {IO} from './observe';
gsap.registerPlugin(SplitText)
export const split = (scope = document) => {
  const paragraphs = scope.querySelectorAll("[data-animation='paragraph']");

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
      visibility: "hidden"
    });

    IO(el, { threshold: 0.7 }).then(() => {
      gsap.to(targets, {
        yPercent: 0,
        visibility: "visible",
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });
    });
  });
};

