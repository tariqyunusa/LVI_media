import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

let splitCache = new WeakMap();

export const splitNavParagraphs = (scope = document) => {
  const paragraphs = scope.querySelectorAll("[data-animation='nav-paragraph']");

  paragraphs.forEach((el) => {
    let lines;

    if (!splitCache.has(el)) {
      const splitInstance = new SplitText(el, {
        type: "lines",
        linesClass: "line",
      });

      splitInstance.lines.forEach((line) => {
        const wrapper = document.createElement("span");
        wrapper.classList.add("text__wrap");
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        line.style.transform = "none";
        line.style.visibility = "hidden";
      });

      lines = el.querySelectorAll(".text__wrap .line");
      splitCache.set(el, lines);
    } else {
      lines = splitCache.get(el);
    }

    gsap.set(lines, {
      y: 100,
      opacity: 0,
      visibility: "hidden",
    });

    gsap.to(lines, {
      y: 0,
      opacity: 1,
      visibility: "visible",
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
      delay: 1.3
    });
  });
};
