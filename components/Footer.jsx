import Image from 'next/image'
import styles from './footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div>
        <p className={styles.paragraph}>ИП Могилевич Д.С.</p>
        <p className={styles.paragraph}>РБ, г. Волковыск, ул. Замковая д. 18</p>
        <p className={styles.paragraph}>св-во о гос. регистрации N 44444444 от 01.01.2001</p>
        <p className={styles.paragraph}>выдано Волковысским райисполкомом.</p>
        <p className={`${styles.paragraph} ${styles.lastParagraph}`}>Дата регистрации в торговом реестре РБ 25.07.2018 номер 422189</p> 
        <span className={styles.registrationDate}>© 2018 GREEN PENGUIN</span>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <a href="#" className={styles.link}>Cashback</a>
          </li>
          <li className={styles.listItem}>
            <a href="#" className={styles.link}>Оплата</a>
          </li>
          <li className={`${styles.listItem} ${styles.lastItem}`}>
            <a href="#" className={styles.link}>Условия доставки</a>
          </li>
        </ul>

        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink}>
            <Image src='/vk.svg' alt='vk' width='40px' height='35px' />
          </a>
          <a href="#" className={styles.socialLink}>
            <Image src='/instagram.svg' alt='instagram' width='inherit' height='inherit' />
          </a>
          <a href="#" className={styles.socialLink}>
            <Image src='/telegram.svg' alt='telegram' width='inherit' height='inherit' />
          </a>
        </div>

        <span className={styles.siteInfo}>info@greenpenguin.by</span>
      </nav>
    </footer>
  )
}