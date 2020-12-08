import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addBasketProduct, setTotalPrice, addProductCount } from '../../redux/basketReducer'
import cn from 'classnames'
import styles from './product.module.css'

const Product = ({ product, dispatch }) => {

  let { basketProducts, productsCount } = useSelector(state => state).basketReducer;

  let isBusketProduct = basketProducts.find(busketProduct => busketProduct._id === product._id)
  let isBusketCountProduct = productsCount && productsCount.find(busketCountProduct => busketCountProduct.id === product._id);
  let [count, setCount] = useState(isBusketCountProduct ? isBusketCountProduct.count : 1);

  const setProductToBasket = () => {
    dispatch(addProductCount({id: product._id, count, price: product.price}));
    dispatch(setTotalPrice(product.price * count));
    dispatch(addBasketProduct(product));
  }

  const decrement = () => {
    if (count === 1) return;
    setCount(--count);
  }

  const increment = () => {
    if (count === 99) return;
    setCount(++count);
  }

  return (
    <div className={styles.productWrapper}>
      <div className={styles.product}>

        <Image className={styles.image} src={product.image ? product.image.src : '/defaultImage.svg'} alt="productImage" width='180px' height='180px' />
        <p className={styles.name}>{product.name}</p>
        
        <div className={styles.info}>
          <p className={styles.price}>{product.price} руб/шт</p>
          <span className={styles.volume}>{product.volume} мл</span>
        </div>

        <div className={styles.inactiveInfo}>
          <div className={styles.counter}>
            <button className={`${styles.increment} ${styles.decrement}`} onClick={decrement} disabled={isBusketProduct}>-</button>
            <p className={styles.count}>{count}</p>
            <button className={styles.increment} onClick={increment} disabled={isBusketProduct}>+</button>
          </div>

          <button className={cn(styles.addToBasket, {[styles.insideBasket]: isBusketProduct})} 
           onMouseDown={setProductToBasket} disabled={isBusketProduct}>
            {isBusketProduct ? 'в корзине' : 'в корзину'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Product;