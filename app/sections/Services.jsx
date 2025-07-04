import Image from "next/image"
import styles from '../styles/sections/Services.module.css'
export default function Services () {
    return(
        <section className={styles.Services_section}>
            <div className={styles.services__border_top}/>
            <main className={styles.main__services}>
                <div className={styles.main__left}>
                    <div className={styles.main__services_image_wrapper}>
                        <Image src="/our_services.jpg" fill alt="our services image" />
                    </div>
                    <a href="" className={styles.Services__link}>Our Service</a>
                </div>
            </main>
            <div  className={styles.services__border_between}/>
            <main className={styles.main__services}>
               <div className={styles.main__right}>
                 <div className={styles.main__right_header}>
                    <p>Capabilities</p>
                </div>
                <div className={styles.main__right_first_paragraph}>
                    <p>Sound Design</p>
                    <p>Storyboarding/Scriptwriting</p>
                    <p>Color Correction/Grading</p>
                    <p>Filming & Editing</p>
                </div>
                <div  className={styles.main__right_second_paragraph}>
                    <p>Commercial Ads</p>
                    <p>Social Media Ads</p>
                    <p>Promotional Contents</p>
                    <p>Campaigns</p>
                </div>
               </div>
            </main>
             <div className={styles.services__border_bottom}/>
        </section>
    )
}