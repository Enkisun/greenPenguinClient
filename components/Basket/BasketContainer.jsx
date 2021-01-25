import Link from 'next/link'
import { useSelector } from 'react-redux'
import BasketProduct from './BasketProduct'
import cn from 'classnames'
import styles from './basketContainer.module.css'

const BasketContainer = () => {

  const { basketProducts, totalPrice } = useSelector(state => state.basket);

  const cashback = (totalPrice * 0.02).toFixed(2);

  const items = basketProducts?.map(product => (
    <BasketProduct key={product.id} basketProduct={product} />
  ));

  return (
    <div className={styles.basketWrapper}>
      <div>
        <h3 className={styles.basketTitle}>Корзина</h3>
        <div className={cn(styles.basketProductWrapper, {[styles.emptyBasket]: items.length === 0})}>
          {items.length > 0 ? items : <p className={styles.emptyBasketText}>Корзина пуста</p>}
        </div>
      </div>

      <div>
        <div className={styles.summaryWrapper}>
          <Link href='/'>
            <a className={styles.btn}>
              <span className={styles.arrow}>←</span> Продолжить покупки
            </a>
          </Link>

          <div className={styles.totalPrice}>
            <h4 className={styles.summary}>ИТОГО {totalPrice} руб</h4>
            <span className={styles.cashback}>Вы получите cashback {cashback} руб. на свой счет</span>
          </div>
        </div>

        <div className={styles.btnWrapper}>
          <a href='#' className={cn(styles.btn, styles.checkout)}>Оформить заказ</a>
        </div>
      </div>
    </div>
  )
}

export default BasketContainer;