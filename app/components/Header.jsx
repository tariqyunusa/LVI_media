"use client"
import Image from "next/image"
import styles from "../styles/Header.module.css"
import { useEffect, useRef, useState } from "react"

export default function Header() {
  const frameRef = useRef()
  const lastTimeRef = useRef(performance.now())
  const framesRef = useRef(0)
  const [fps, setFps] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = performance.now()
      framesRef.current++

      if (now - lastTimeRef.current >= 1000) {
        setFps(framesRef.current)
        framesRef.current = 0
        lastTimeRef.current = now
      }

      frameRef.current = requestAnimationFrame(update)
    }

    frameRef.current = requestAnimationFrame(update)

    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <nav className={styles.nav__header}>
      <p className={styles.FPS} data-animation='paragraph'>FPS: {fps.toFixed(2)}</p>
      <div className={styles.logo} data-animation='image'>
        <Image src='/logo.png' alt="LVI_logo" fill />
      </div>
      <button className={styles.nav__cta_menu} data-animation="fade" >
        <div className={styles.indicator} />
        <div className={styles.nav__inner_menu}>menu</div>
      </button>
    </nav>
  )
}
