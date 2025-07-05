"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Infused from "./sections/Infused";
import About from "./sections/About";
import Services from "./sections/Services";
import Marquee from "./components/Marquee";
import Footer from "./sections/Footer";


export default function Home() {
  const [audio, setAudio] = useState("off")
  return (
   <>
   <section className={styles.hero}>
    <main className={styles.hero__main}>
      <h1 className={styles.hero__headline} >
        We make cool videos for sport brands around the world <span /> 
      </h1>
    </main>
    <div className={styles.hero__footer}>
      <p className={styles.white__balance}>SHUTTER: 100</p>
      <p className={styles.scroll__indicator}>Scroll to explore</p>
      <div className={styles.audio__toggle}> <p className={styles.audio__indicator} >Audio:</p>  <button className={styles.audio__toggle_main}>{audio}</button></div>
    </div>
   </section>
    <Infused />
    <About />
    <Services />
    <Marquee />
    <Footer />
   </>
  );
}
