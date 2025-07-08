"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useLayoutEffect, useState } from "react";
import Infused from "./sections/Infused";
import About from "./sections/About";
import Services from "./sections/Services";
import Marquee from "./components/Marquee";

export default function Home() {
  const [audio, setAudio] = useState("off");

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
            <button className={styles.audio__toggle_main}>{audio}</button>
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
