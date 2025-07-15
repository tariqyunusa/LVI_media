"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useLayoutEffect, useState, useRef } from "react";
import Infused from "./sections/Infused";
import About from "./sections/About";
import Services from "./sections/Services";
import Marquee from "./components/Marquee";

export default function Home() {
  const [audioState, setAudioState] = useState("off");
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Nike.m4a");
      audioRef.current.loop = true; 
    }

    if (audioRef.current.paused) {
      audioRef.current.play();
      setAudioState("on");
    } else {
      audioRef.current.pause();
      setAudioState("off");
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <main className={styles.hero__main}>
          <h1 className={styles.hero__headline} data-animation="paragraph">
            We make cool videos for sport brands around the{" "}
            <span className={styles.ellipse__wrap}>
              world
              <div className={styles.ellipse} />
            </span>
          </h1>
        </main>
        <div className={styles.hero__footer}>
          <p className={styles.white__balance} data-animation="paragraph">
            SHUTTER: 100
          </p>
          <p className={styles.scroll__indicator} data-animation="paragraph">
            Scroll to explore
          </p>
          <div className={styles.audio__toggle}>
            {" "}
            <p className={styles.audio__indicator} data-animation="paragraph">
              Audio:
            </p>{" "}
            <button className={styles.audio__toggle_main} onClick={toggleAudio}>{audioState}</button>
          </div>
        </div>
      </section>
      <Infused />
      <About />
      <Services />
      <Marquee />
    </>
  );
}
