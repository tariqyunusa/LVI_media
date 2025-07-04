import Splitting from "splitting";
import { IO } from "./observe";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

export const split = () => {
    const paragraph = document.querySelectorAll("[data-animation='paragraph']")
    const sideHeader = document.querySelectorAll("[data-animation='side-header']")

    paragraph.forEach((item) => {
        const line = Splitting({
            target: item,
            by: "lines",
        });
        line.forEach((splitResult) => {
            const wrappedText = splitResult.words.map((words) => `<span class="text__mask">${words.outerHTML}</span>`).join("");
            splitResult.el.innerHTML = wrappedText
        })

        gsap.set(item.querySelectorAll(".word"), {
            yPercent: 100,
            opacity: 0,
            transformStyle: "preserve-3d"
        });
        IO(item, { threshold: 0.8 }).then(() => {
            const element = item.querySelectorAll(".word");
            gsap.to(element, {
                yPercent: 0,
                opacity: 1,
                stagger: element.length > 100 ? 0.02 : 0.03,
                duration: element.length > 100 ? 0.65 : 0.75,
                ease: "power4.out"
            })
        })
    })

    sideHeader.forEach((item) => {
        Splitting({
            target: item,
            by: "chars",
        })
        gsap.set(item.querySelectorAll(".char"), {
            opacity: 0,
            xPercent: 100,
            transformStyle: "preserve-3d"
        });
        IO(item, {threshold: 1}).then(() => {
            const element = item.querySelectorAll(".char");
            gsap.to(element, {
                opacity: 1,
                xPercent: 0,
                stagger: element.length > 100 ? 0.01 : 0.02,
                duration: element.length > 100 ? 0.5 : 0.6,
                ease: "power4.out"
            })
        })
    })
}