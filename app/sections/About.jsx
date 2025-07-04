import styles from '../styles/sections/About.module.css'
import Link from 'next/link'
import Image from 'next/image'
export default function About () {
    return(
        <section className={styles.about__section}>
            <main className={styles.about__main__first}> 
               <div className={styles.about__top}>
                 <div className={styles.about__sub_header}>
                    <h6>
                        We transcends expectations and propels you to the undisputed championship of the game.
                    </h6>
                </div>
                <div className={styles.about__main_paragraph}>
                    <div className={styles.about__main_paragraph_first}>
                        <p>We are the language of champions.</p>
                    </div>
                    <div className={styles.about__main_paragraph_second}>
                        <p>LVI Media is more than just a video production company. We are the chroniclers of legends in the making</p>
                    </div>
                    <div className={styles.about__main_paragraph_third}>
                        <p>We are the bards who weave tales of athletic prowess and unwavering spirit. In every frame we capture, every sequence we craft, we distil the very essence of what it means to be a champion</p>
                        <a>More about us</a>
                    </div>
                </div>
               </div>

                <div className={styles.about__image_container}>
                    <div className={styles.about__image_little}>
                        <Image src='/about_little.jpg' alt='a director holding a camera' fill className={styles.image_little}/>

                    </div>
                    <div className={styles.about__image_large}>
                        <Image src='/about_large.jpg' alt='a person holding a camera' fill className={styles.image_large} />

                    </div>

                </div>
                
            </main>
            <section className={styles.about__consumer_section}>
                <div className={styles.about__consumer_main}>
                    <div className={styles.about__consumer_headline}>
                        <span />
                        <div className={styles.about__consumer_headline_main}>
                            <p>Did you know?</p>
                        </div>
                    </div>
                    <div className={styles.about__consumer_header}>
                        <h1>
                            92% of consumers watch videos with the sound off
                        </h1>
                        <div className={styles.off__style}/>
                    </div>
                </div>
            </section>
        </section>
    )
}