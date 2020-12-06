import Image from 'next/image'
import classes from './footer.module.css'

export const Footer = () => {
  return (
    <footer className={classes.container}>
      <div>
        <p className={classes.paragraph}>ИП Могилевич Д.С.</p>
        <p className={classes.paragraph}>РБ, г. Волковыск, ул. Замковая д. 18</p>
        <p className={classes.paragraph}>св-во о гос. регистрации N 44444444 от 01.01.2001</p>
        <p className={classes.paragraph}>выдано Волковысским райисполкомом.</p>
        <p className={`${classes.paragraph} ${classes.lastParagraph}`}>Дата регистрации в торговом реестре РБ 25.07.2018 номер 422189</p> 
        <span className={classes.registrationDate}>© 2018 GREEN PENGUIN</span>
      </div>

      <nav className={classes.navigation}>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <a href="#" className={classes.link}>Cashback</a>
          </li>
          <li className={classes.listItem}>
            <a href="#" className={classes.link}>Оплата</a>
          </li>
          <li className={`${classes.listItem} ${classes.lastItem}`}>
            <a href="#" className={classes.link}>Условия доставки</a>
          </li>
        </ul>

        <div className={classes.socialLinks}>
          <a href="#" className={classes.socialLink}>
            <Image src='/vk.svg' alt='vk' width='40px' height='35px' />
          </a>
          <a href="#" className={classes.socialLink}>
            <Image src='/instagram.svg' alt='instagram' width='inherit' height='inherit' />
          </a>
          <a href="#" className={classes.socialLink}>
            <Image src='/telegram.svg' alt='telegram' width='inherit' height='inherit' />
          </a>
        </div>

        <span className={classes.siteInfo}>info@greenpenguin.by</span>
      </nav>
    </footer>
  )
}