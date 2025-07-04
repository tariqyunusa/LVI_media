import styles from "../styles/Marquee.module.css";
import Image from "next/image";

const logos = [
  { id: 1, width: 52, height: 52 },
  { id: 2, width: 319.15, height: 50 },
  { id: 3, width: 67.73, height: 40 },
  { id: 4, width: 247.92, height: 50 },
  { id: 5, width: 176, height: 40 },
  { id: 6, width: 150, height: 52.5 },
  { id: 7, width: 204.8, height: 50 },
];

export default function Marquee() {
  return (
    <section className={styles.marquee}>
      <div className={styles.marquee__inner}>
        {[...logos, ...logos].map(({ id, width, height }, i) => (
          <div
            key={i}
            className={`${styles.logo} logo-${id}`} 
            style={{
              width,
              height,
              position: "relative",
              flexShrink: 0,
              marginRight: "2rem",
            }}
          >
            <Image
              src={`/logo${id}.jpg`}
              alt={`sponsor logo ${id}`}
              fill
              className={styles.logoImage}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
