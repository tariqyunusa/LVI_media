"use client";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import NavImage from "./NavImage";
import { Canvas } from "@react-three/fiber";

export default function Header() {
  const frameRef = useRef();
  const lastTimeRef = useRef(0);
  const framesRef = useRef(0);
  const [fps, setFps] = useState(0);
  const [openNav, setOpenNav] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [index, setIndex] = useState(0);

  let lenis;
  useEffect(() => {
    const update = (timestamp) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      framesRef.current++;

      const delta = timestamp - lastTimeRef.current;
      if (delta >= 1000) {
        setFps(Math.round((framesRef.current * 1000) / delta));
        framesRef.current = 0;
        lastTimeRef.current = timestamp;
      }

      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  if (typeof window !== "undefined") {
    lenis = window.lenisInstance || null;
  }

  useEffect(() => {
    if (!lenis) return;

    if (openNav) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
    }

    return () => {
      lenis.start();
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

  const TopHeader = () => (
    <div className={styles.top__nav_header}>
      <div className={styles.top__nav_header__inner}>
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
    </div>
  );

  return (
    <nav className={styles.nav__header}>
      {!openNav && <TopHeader />}

      <div
        className={`${styles.nav__links__wrapper} ${
          openNav ? styles.open : ""
        } ${closing ? styles.closing : ""}`}
      >
        {openNav && (
          <div className={styles.nav__links_header_inner}>
            <TopHeader />
          </div>
        )}

        <div className={styles.nav__links_container}>
          <div className={styles.nav__left_section}>
            <ul className={styles.nav__links_ul}>
              {["Home", "Services", "About Us", "Contact"].map(
                (link, i, arr) => (
                  <li key={i}>
                    <a
                      href="#"
                      data-text={link}
                      className={`${styles.nav_link} ${
                        activeLink === link ? styles.active : ""
                      }`}
                      onClick={() => setActiveLink(link)}
                      onMouseEnter={() => setIndex(i)}
                      onMouseLeave={() => {
                        const activeIndex = [
                          "Home",
                          "Services",
                          "About Us",
                          "Contact",
                        ].indexOf(activeLink);
                        setIndex(activeIndex);
                      }}
                    >
                      {link}
                      {i !== arr.length - 1 && ","}
                    </a>
                  </li>
                )
              )}
            </ul>
            <div className={styles.nav__left__contact}>
              <p>Address: Via Nazionale, 184 00184 Roma, Italy</p>
              <p>Tel: +2348169945591 Email: info@lvimedia.com</p>
            </div>
          </div>

          <div className={styles.nav__right_section}>
            <div className={styles.nav__left_image__wrapper}>
              <Canvas>
                <NavImage index={index} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
