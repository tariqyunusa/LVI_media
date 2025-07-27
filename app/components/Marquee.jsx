"use clien"
import styles from "../styles/Marquee.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";


function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile(); 
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

const logos = [
  { id: 1, width: 52, height: 52, mobileWidth: 26.25, mobileHeight: 26.25 },
  { id: 2, width: 319.15, height: 50, mobileWidth: 159.57, mobileHeight: 25 },
  { id: 3, width: 67.73, height: 40, mobileWidth: 33, mobileHeight: 20 },
  { id: 4, width: 247.92, height: 50, mobileWidth: 123, mobileHeight: 25 },
  { id: 5, width: 176, height: 40, mobileWidth: 88, mobileHeight: 20 },
  { id: 6, width: 150, height: 52.5, mobileWidth: 75, mobileHeight: 27 },
  { id: 7, width: 204.8, height: 50, mobileWidth: 102, mobileHeight: 25 },
];

export default function Marquee() {
  const isMobile = useIsMobile();

  return (
    <section className={styles.marquee}>
      <div className={styles.marquee__inner}>
        {[...logos, ...logos].map(({ id, width, height, mobileWidth, mobileHeight }, i) => {
          const logoWidth = isMobile ? mobileWidth : width;
          const logoHeight = isMobile ? mobileHeight : height;

          return (
            <div
              key={i}
              className={`${styles.logo} logo-${id}`}
              style={{
                width: logoWidth,
                height: logoHeight,
                position: "relative",
                flexShrink: 0,
                marginRight: "2rem",
              }}
            >
              <Image
                src={`/logo${id}.webp`}
                alt={`sponsor logo ${id}`}
                fill
                className={styles.logoImage}
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}