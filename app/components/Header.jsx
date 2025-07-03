import Image from "next/image"
import styles from "../styles/Header.module.css"
export default function Header() {
    return(
        <nav className={styles.nav__header}>
            <p className={styles.FPS}>FPS: 23.90</p>
            <div className={styles.logo}>
                <Image src='/logo.png' alt="LVI_logo" fill/>
            </div>
            <button className={styles.nav__cta_menu}><div className={styles.indicator}/><div className={styles.nav__inner_menu}>menu</div></button>
        </nav>
    )
}