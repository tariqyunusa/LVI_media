"use client";
import Image from "next/image";
import styles from "../styles/sections/Services.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
export default function Services() {
  const topRef = useRef(null);
  const betweenRef = useRef(null);
  const bottomRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(topRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.to(topRef.current, {
      scaleX: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: topRef.current,
        start: "top 90%",
      },
    });


    gsap.set(betweenRef.current, { scaleY: 0, transformOrigin: "top" });
    gsap.to(betweenRef.current, {
      scaleY: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: betweenRef.current,
        start: "top 90%",
      },
    });


    gsap.set(bottomRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.to(bottomRef.current, {
      scaleX: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: bottomRef.current,
        start: "top 90%",
      },
    });
  }, []);
  return (
    <section className={styles.Services_section}>
      <div className={styles.services__border_top} ref={topRef} />
      <main className={styles.main__services}>
        <div className={styles.main__left}>
          <div
            className={styles.main__services_image_wrapper}
            data-animation="image"
          >
            <Image src="/our_services.jpg" fill alt="our services image" />
          </div>
          <a
            href=""
            className={styles.Services__link}
            data-animation="paragraph"
          >
            Our Service
          </a>
        </div>
      </main>
      <div className={styles.services__border_between} ref={betweenRef} />
      <main className={styles.main__services}>
        <div className={styles.main__right}>
          <div className={styles.main__right_header}>
            <p data-animation="paragraph">Capabilities</p>
          </div>
          <div className={styles.main__right_first_paragraph}>
            <p data-animation="paragraph">Sound Design</p>
            <p data-animation="paragraph">Storyboarding/Scriptwriting</p>
            <p data-animation="paragraph">Color Correction/Grading</p>
            <p data-animation="paragraph">Filming & Editing</p>
          </div>
          <div className={styles.main__right_second_paragraph}>
            <p data-animation="paragraph">Commercial Ads</p>
            <p data-animation="paragraph">Social Media Ads</p>
            <p data-animation="paragraph">Promotional Contents</p>
            <p data-animation="paragraph">Campaigns</p>
          </div>
        </div>
      </main>
      <div className={styles.services__border_bottom} ref={bottomRef} />
    </section>
  );
}
