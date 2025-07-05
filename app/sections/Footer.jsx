import styles from "../styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <main className={styles.footer__main_first}>
        <div className={styles.footer__headline}>
          <h1 className={styles.headline_header}>
            Ready to start a project with us?
          </h1>
          <h1 className={styles.headline_link}>
            <a href="">Shoot a mail</a>
          </h1>
        </div>
        <div className={styles.footer__main__links_first}>
          <div className={styles.footer__first_routes}>
            <div className={styles.footer__contact_us_first}>
              <p>Contact us</p>
            </div>
            <div className={styles.footer__routes_sections}>
              <a href="">Home</a>
              <a href="">About Us</a>
              <a href="">Service</a>
              <a href="">Contact Us</a>
            </div>
          </div>
          <div className={styles.footer__main__links_second}>
            <div className={styles.footer__socials}>
              <a href="">Instagram</a>
              <a href="">Vimeo</a>
              <a href="">LinkedIn</a>
              <a href="">Facebook</a>
            </div>
            <div className={styles.BTP}>
              <a href="">Back to top</a>
            </div>
          </div>
        </div>
      </main>
      <main className={styles.footer__main_second}>
      <div className={styles.footer__main_second_wrapper}>
          <div className={styles.footer__main_contact}>
          <p>Address: 123 Jagun Jagun, Okokomaiko Lagos, Nigeria</p>
          <p>Tel: +2348169945591<br/>Email: info@lvimedia.com</p>
        </div>
        <div className={styles.footer__main_footer}>
            <p>All Right Reserved</p>
            <p>3D Assets by Blender Swap</p>
            <p>Designed by Frame 56 & Olamide</p>
            <p>Dev by Tariq</p>
        </div>
      </div>
      </main>
    </footer>
  );
}
