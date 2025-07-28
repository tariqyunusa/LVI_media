"use client";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import NavImage from "./NavImage";
import { Canvas } from "@react-three/fiber";
import { animateNavigation } from "../animations/navAnimation";

export default function Header() {
  const frameRef = useRef();
  const lastTimeRef = useRef(0);
  const framesRef = useRef(0);
  const [fps, setFps] = useState(0);
  const [openNav, setOpenNav] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const logoRef = useRef();
  const fpsRef = useRef();
  const buttonRef = useRef();

  const linkRefs = useRef([]);
  const addToLinkRefs = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  const planeRef = useRef();
  const timelineRef = useRef();

  useLayoutEffect(() => {
    const checkReadyAndAnimate = () => {
      if (openNav && !closing) {
        if (!planeRef.current?.material?.uniforms?.uOpacity) {
          requestAnimationFrame(checkReadyAndAnimate);
          return;
        }
      }

      animateNavigation({
        state: { openNav, closing },
        refs: {
          planeRef,
          logoRef,
          fpsRef,
          buttonRef,
          linkRefs,
          timelineRef,
        },
        onComplete: () => {
          setOpenNav(false);
          setClosing(false);
          linkRefs.current = [];
        },
      });
    };

    checkReadyAndAnimate();
  }, [openNav, closing]);

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

  let lenis;
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
    } else {
      linkRefs.current = [];
      setOpenNav(true);
    }
  };

  const TopHeader = () => (
    <div className={styles.top__nav_header}>
      <div className={styles.top__nav_header__inner}>
        <p className={styles.FPS} ref={fpsRef} >
          FPS: {fps.toFixed(2)}
        </p>
        <div className={styles.logo} ref={logoRef} >
          <Image src="/logo.png" alt="LVI_logo" fill />
        </div>
        <button
          className={styles.nav__cta_menu}
          onClick={handleToggleNav}
          ref={buttonRef}
         
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
        <div className={styles.nav__links_header_inner}>
          <TopHeader />
        </div>
        <div className={styles.nav__links_container}>
          <div className={styles.nav__left_section}>
            <ul className={styles.nav__links_ul}>
              {["Home", "Services", "About Us", "Contact"].map(
                (link, i, arr) => (
                  <li key={i}>
                    <a
                      href="#"
                      data-text={link}
                      ref={addToLinkRefs}
                      className={`${styles.nav_link} ${
                        activeLink === link ? styles.active : ""
                      }`}
                      onClick={() => setActiveLink(link)}
                      onMouseEnter={() => {
                        setIndex(i);
                        setIsHovered(true);
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
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
              <p data-animation="nav-paragraph">Address: Via Nazionale, 184 00184 Roma, Italy</p>
              <p data-animation="nav-paragraph">
                Tel: +2348169945591
                <br /> Email: info@lvimedia.com
              </p>
            </div>
          </div>
          <div className={styles.nav__right_section}>
            <div className={styles.nav__left_image__wrapper}>
              <Canvas>
                <NavImage
                  index={index}
                  isHovered={isHovered}
                  planeRef={planeRef}
                />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
