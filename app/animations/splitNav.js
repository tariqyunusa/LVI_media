import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const splitNavParagraphs = (scope = document) => {
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


      line.style.transform = "none";
      line.style.visibility = "hidden";
    });

    const targets = el.querySelectorAll(".text__wrap .line");

    gsap.set(targets, {
      y: 100,
      opacity: 0,
      visibility: "hidden",
    });

    gsap.to(targets, {
      y: 0,
      opacity: 1,
      visibility: "visible",
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
      delay: 1.5,
    });
  });
};
