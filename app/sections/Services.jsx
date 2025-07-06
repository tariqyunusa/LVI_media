import Image from "next/image"
import styles from '../styles/sections/Services.module.css'
export default function Services () {
    return(
        <section className={styles.Services_section}>
            <div className={styles.services__border_top}/>
            <main className={styles.main__services}>
                <div className={styles.main__left}>
                    <div className={styles.main__services_image_wrapper} data-animation='image'>
                        <Image src="/our_services.jpg" fill alt="our services image" />
                    </div>
                    <a href="" className={styles.Services__link} data-animation='paragraph'>Our Service</a>
                </div>
            </main>
            <div  className={styles.services__border_between}/>
            <main className={styles.main__services}>
               <div className={styles.main__right}>
                 <div className={styles.main__right_header}>
                    <p data-animation='paragraph'>Capabilities</p>
                </div>
                <div className={styles.main__right_first_paragraph}>
                    <p data-animation='paragraph'>Sound Design</p>
                    <p data-animation='paragraph'>Storyboarding/Scriptwriting</p>
                    <p data-animation='paragraph'>Color Correction/Grading</p>
                    <p data-animation='paragraph'>Filming & Editing</p>
                </div>
                <div  className={styles.main__right_second_paragraph}>
                    <p data-animation='paragraph'>Commercial Ads</p>
                    <p data-animation='paragraph'>Social Media Ads</p>
                    <p data-animation='paragraph'>Promotional Contents</p>
                    <p data-animation='paragraph'>Campaigns</p>
                </div>
               </div>
            </main>
             <div className={styles.services__border_bottom}/>
        </section>
    )
}