import styles from "../styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <main className={styles.footer__main_first}>
        <div className={styles.footer__headline}>
          <h1 className={styles.headline_header} data-animation='paragraph'>
            Ready to start a project with us?
          </h1>
          <h1 className={styles.headline_link} data-animation='paragraph'>
            <a href="">Shoot a mail</a>
          </h1>
        </div>
        <div className={styles.footer__main__links_first}>
          <div className={styles.footer__first_routes}>
            <div className={styles.footer__contact_us_first}>
              <p data-animation='paragraph'>Contact us</p>
            </div>
            <div className={styles.footer__routes_sections}>
              <a href="" data-animation='paragraph'>Home</a>
              <a href="" data-animation='paragraph'>About Us</a>
              <a href="" data-animation='paragraph'>Service</a>
              <a href="" data-animation='paragraph'>Contact Us</a>
            </div>
          </div>
          <div className={styles.footer__main__links_second}>
            <div className={styles.footer__socials}>
              <a href="" data-animation='paragraph'>Instagram</a>
              <a href="" data-animation='paragraph'>Vimeo</a>
              <a href="" data-animation='paragraph'>LinkedIn</a>
              <a href="" data-animation='paragraph'>Facebook</a>
            </div>
            <div className={styles.BTP}>
              <a href="" data-animation='paragraph'>Back to top</a>
            </div>
          </div>
        </div>
      </main>
      <main className={styles.footer__main_second}>
      <div className={styles.footer__main_second_wrapper}>
          <div className={styles.footer__main_contact}>
          <p data-animation='paragraph'>Address: 123 Jagun Jagun, Okokomaiko Lagos, Nigeria</p>
          <p data-animation='paragraph'>Tel: +2348169945591<br/>Email: info@lvimedia.com</p>
        </div>
        <div className={styles.footer__main_footer}>
            <p data-animation='paragraph'>All Right Reserved</p>
            <p data-animation='paragraph'>3D Assets by Blender Swap</p>
            <p data-animation='paragraph'>Designed by Frame 56 & Olamide</p>
            <p data-animation='paragraph'>Dev by Tariq</p>
        </div>
      </div>
      </main>
    </footer>
  );
}
