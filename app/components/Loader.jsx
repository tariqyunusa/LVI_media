import Image from "next/image";
import styles from "../styles/sections/Loader.module.css"

export default function Loader ({progress}) {
    return (
        <section className={styles.loader__section}>
            <main className={styles.loader_main}>
                <div className={styles.loader__container_top}>
                    <h1>LVI</h1>
                    <div className={styles.loader__image_wrapper}>
                        <Image src="/lod-1.jpg" fill alt="loader image"/>
                    </div>
                    <h1>STUDIO</h1>
                </div>
                <div className={styles.loader__container_bottom}>
                     <h2>0{progress < 10 ? 0 : ""}{progress}</h2>
                    <h2>100</h2>
                </div>
            </main>
        </section>
    )
}