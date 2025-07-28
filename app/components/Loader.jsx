"use client";
import Image from "next/image";
import styles from "../styles/sections/Loader.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }) {
  const images = [
    "/lod-1.jpg",
    "/nav/about.webp",
    "/nav/contact.webp",
    "/nav/home.webp",
    "/nav/services.webp",
    "/lod-gif.gif",
  ];

  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const imageRefs = useRef([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(null);
  const [fakeProgress, setFakeProgress] = useState(0);

  useLayoutEffect(() => {
    // Initialize loader bar
    gsap.set(containerRef.current, { width: "0%" });

    // Animate loader bar and image reveal
    gsap.to(containerRef.current, {
      width: "100%",
      duration: 1,
      delay: 1.5,
      ease: "power4.inOut",
      onComplete: () => {
        let index = 0;
        const imageInterval = setInterval(() => {
          setPrevImage(index);
          index += 1;

          if (index >= images.length) {
            clearInterval(imageInterval);
            setTimeout(() => {
              gsap.to([containerRef.current.parentElement, counterRef.current], {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                  onComplete?.();
                },
              });
            }, 800);
            return;
          }

          setCurrentImage(index);
        }, 600);
      },
    });

    // Custom progress steps
    const progressSteps = [22, 39, 53, 80, 100];
    let stepIndex = 0;

    const stepInterval = setInterval(() => {
      setFakeProgress(progressSteps[stepIndex]);
      stepIndex++;

      if (stepIndex >= progressSteps.length) {
        clearInterval(stepInterval);
      }
    }, 400); // Adjust speed of progress steps here

    return () => clearInterval(stepInterval);
  }, []);

  // Animate image transition on currentImage change
  useLayoutEffect(() => {
    if (imageRefs.current[currentImage]) {
      gsap.fromTo(
        imageRefs.current[currentImage],
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.6,
          ease: "power2.inOut",
        }
      );
    }
  }, [currentImage]);

  return (
    <section className={styles.loader__section}>
      <main className={styles.loader_main}>
        <div className={styles.loader__container_top}>
          <h1>LVI</h1>
          <div
            className={styles.loader__image_wrapper}
            ref={containerRef}
            style={{ overflow: "hidden", position: "relative" }}
          >
            {prevImage !== null && prevImage !== currentImage && (
              <Image
                src={images[prevImage]}
                fill
                alt="previous"
                style={{
                  position: "absolute",
                  inset: 0,
                  objectFit: "cover",
                  zIndex: 0,
                }}
              />
            )}
            <Image
              key={currentImage}
              ref={(el) => (imageRefs.current[currentImage] = el)}
              src={images[currentImage]}
              fill
              alt="current"
              style={{
                position: "absolute",
                inset: 0,
                objectFit: "cover",
                zIndex: 1,
              }}
            />
          </div>
          <h1>STUDIO</h1>
        </div>

        <div className={styles.loader__container_bottom} ref={counterRef}>
          <h2>{fakeProgress.toString().padStart(3, "0")}</h2>
          <h2>100</h2>
        </div>
      </main>
    </section>
  );
}
