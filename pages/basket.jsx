import Link from 'next/link'
import { useSelector } from 'react-redux'
import { BasketProduct } from '../components/BasketProduct'
import cn from 'classnames'
import classes from '../styles/basketPage.module.css'

const BasketPage = () => {

  let { basketProducts, totalPrice } = useSelector(state => state).basketReducer;

  let cashback = (totalPrice * 0.02).toFixed(2);

  let items = basketProducts && basketProducts.map(product => (
    <BasketProduct key={product._id} basketProduct={product} />
  ));
  console.log(items)

  return (
    <div className={classes.basketWrapper}>
      <div>
        <h3 className={classes.basketTitle}>Корзина</h3>
        <div className={cn(classes.basketProductWrapper, {[classes.emptyBasket]: items.length === 0})}>
          {items.length > 0 ? items : <p className={classes.emptyBasketText}>Корзина пуста</p>}
        </div>
      </div>

      <div>
        <div className={classes.summaryWrapper}>
          <Link href='/'>
            <a className={classes.btn}>
              <span className={classes.arrow}>←</span> Продолжить покупки
            </a>
          </Link>

          <div className={classes.totalPrice}>
            <h4 className={classes.summary}>ИТОГО {totalPrice} руб</h4>
            <span className={classes.cashback}>Вы получите cashback {cashback} руб. на свой счет</span>
          </div>
        </div>

        <div className={classes.btnWrapper}>
          <a href='#' className={`${classes.btn} ${classes.checkout}`}>Оформить заказ</a>
        </div>
      </div>
    </div>
  )
}

export default BasketPage;