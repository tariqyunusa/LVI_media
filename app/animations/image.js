import { IO } from "./observe";
import gsap from "gsap";

export const revealImage = () => {
    const images = document.querySelectorAll("[data-animation='image']");
    images.forEach((item) => {
        gsap.set(item, {
            yPercent: 100,
            scale: 0.7,
            transformStyle: "preserve-3d"
        })
        IO(item, {threshold: 0.8}).then(() => {
            gsap.to(item, {
                yPercent: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
            })
        })
    })
}