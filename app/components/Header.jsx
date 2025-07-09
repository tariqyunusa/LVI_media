"use client";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { split } from "../animations/text";

export default function Header() {
  const frameRef = useRef();
  const lastTimeRef = useRef(0);
  const framesRef = useRef(0);
  const [fps, setFps] = useState(0);

  const [openNav, setOpenNav] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const update = (timestamp) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      framesRef.current++;

      const delta = timestamp - lastTimeRef.current;

      if (delta >= 1000) {
        const currentFps = Math.round((framesRef.current * 1000) / delta);
        setFps(currentFps);
        framesRef.current = 0;
        lastTimeRef.current = timestamp;
      }

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    if (openNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openNav]);

  const handleToggleNav = () => {
    if (openNav) {
      setClosing(true);
      setTimeout(() => {
        setOpenNav(false);
        setClosing(false);
      }, 1000);
    } else {
      setOpenNav(true);
    }
  };

  useEffect(() => {
    if (openNav) {
      const timeout = setTimeout(() => {
        const navWrapper = document.querySelector(
          `.${styles.nav__links__wrapper}`
        );
        if (!navWrapper) return;

        navWrapper
          .querySelectorAll("[data-animation='paragraph']")
          .forEach((el) => {
            el.removeAttribute("data-split");

            const textWraps = el.querySelectorAll(".text__wrap");
            if (textWraps.length) {
              textWraps.forEach((wrap) => {
                const parent = wrap.parentNode;
                while (wrap.firstChild) {
                  parent.insertBefore(wrap.firstChild, wrap);
                }
                parent.removeChild(wrap);
              });
            }

            el.querySelectorAll(".line").forEach((line) => {
              const parent = line.parentNode;
              if (line.textContent) {
                const textNode = document.createTextNode(line.textContent);
                parent.replaceChild(textNode, line);
              }
            });
          });

        split(navWrapper);

        const images = navWrapper.querySelectorAll("[data-animation='image']");
        images.forEach((img) => {
          gsap.set(img, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            visibility: "hidden",
          });

          gsap.to(img, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            visibility: "visible",
            duration: 1,
            ease: "power4.out",
          });
        });
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [openNav]);

  return (
    <nav className={styles.nav__header}>
      <div className={styles.top__nav_header}>
        <p className={styles.FPS}>FPS: {fps.toFixed(2)}</p>
        <div className={styles.logo} data-animation="image">
          <Image src="/logo.png" alt="LVI_logo" fill />
        </div>
        <button
          className={styles.nav__cta_menu}
          data-animation="fade"
          onClick={handleToggleNav}
        >
          <div className={styles.indicator} />
          <div className={styles.nav__inner_menu}>
            {openNav ? "close" : "menu"}
          </div>
        </button>
      </div>

      <div
        className={`${styles.nav__links__wrapper} ${
          openNav ? styles.open : ""
        } ${closing ? styles.closing : ""}`}
      >
        <div className={styles.nav__left_section}>
          <ul className={styles.nav__links_ul}>
            <li>
              <a href="" className={styles.nav_link} data-animation="paragraph">
                Home,
              </a>
            </li>
            <li>
              <a href="" className={styles.nav_link} data-animation="paragraph">
                Services,
              </a>
            </li>
            <li>
              <a href="" className={styles.nav_link} data-animation="paragraph">
                About Us,
              </a>
            </li>
            <li>
              <a href="" className={styles.nav_link} data-animation="paragraph">
                Contact
              </a>
            </li>
          </ul>
          <div className={styles.nav__left__contact}>
            <p data-animation="paragraph">
              Address: Via Nazionale, 184 00184 Roma, Italy
            </p>
            <p data-animation="paragraph">
              Tel: +2348169945591 Email: info@lvimedia.com
            </p>
          </div>
        </div>
        <div className={styles.nav__right_section}>
          <div
            className={styles.nav__left_image__wrapper}
            data-animation="image"
          >
            <Image
              className={styles.nav__left_image}
              src="/about_large.jpg"
              fill
              alt="nav hover image animation"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
