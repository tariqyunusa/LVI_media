"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Styles from "../styles/sections/Infused.module.css";

export default function Infused() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const el = containerRef.current;
      gsap.set(el, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        scale: 0.2,
        yPercent: -60,
  
      });

      gsap.to(el, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.2,
        ease: "power2.out",
        delay: 1.2,
      });

      gsap.to(el, {
        scale: 1,
        yPercent: 0,
 
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={Styles.infused}>
      <div className={Styles.clipWrapper} ref={containerRef}>
        <Image
          src="/infused.png"
          alt="Infused section image"
          fill
          className={Styles.infused__image}
        />
      </div>
    </section>
  );
}
