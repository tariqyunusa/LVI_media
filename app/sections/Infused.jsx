import Image from "next/image"
import Styles from "../styles/sections/Infused.module.css"
export default function Infused () {
    return(
        <section className={Styles.infused}>
            <Image src='/infused.png' fill alt="Infused section image"/>
        </section>
    )
}