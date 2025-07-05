"use client"
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Styles from "../styles/sections/Infused.module.css";

export default function Infused() {
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, {
        scale: 0.2,
        yPercent: -68,
      });

      gsap.to(imageRef.current, {
        scale: 1,
        yPercent: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top +=500px",
          end: "top +=100px",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={Styles.infused}>
      <Image
        src="/infused.png"
        fill
        alt="Infused section image"
        className={Styles.infused__image}
        ref={imageRef}
      />
    </section>
  );
}
