import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addBasketProduct, setTotalPrice, changeProductCount } from '../../redux/basketReducer'
import cn from 'classnames'
import styles from './product.module.css'
import Counter from '../../common/Counter'

const Product = ({ product, dispatch }) => {

  const { basketProducts } = useSelector(state => state.basket);

  const isBusketProduct = basketProducts?.find(busketProduct => busketProduct.id === product._id)
  let [count, setCount] = useState(isBusketProduct ? isBusketProduct.count : 1);

  const addProductToBasket = () => {
    dispatch(addBasketProduct({id: product._id, count, price: product.price, image: product.image, name: product.name}));
    dispatch(setTotalPrice(product.price * count));
  }

  const updateBasketProducts = type => {
    dispatch(changeProductCount({id: product._id, count}));
    dispatch(setTotalPrice(type === 'asc' ? product.price : -(product.price)));
  }

  const decrement = () => {
    if (count > 1) {
      setCount(--count);
      isBusketProduct && updateBasketProducts('desc');
    }
  }

  const increment = () => {
    if (count < 99) {
      setCount(++count);
      isBusketProduct && updateBasketProducts('asc');
    }
  }

  return (
    <div className={styles.productWrapper}>
      <div className={styles.product}>

        <Image 
         className={styles.image} 
         src={product.image ? `http://localhost:5000/${product.image}` : '/defaultImage.svg'}
         alt="product_image"
         width='180px'
         height='180px'
        />

        <p className={styles.name}>{product.name}</p>
        
        <div className={styles.info}>
          <p className={styles.price}>{product.price} руб/шт</p>
          <span className={styles.volume}>{product.size} {product.unit}</span>
        </div>

        <div className={styles.inactiveInfo}>
          <Counter count={count} increment={increment} decrement={decrement} type='product' />

          <button className={cn(styles.addToBasket, {[styles.insideBasket]: isBusketProduct})} 
           onMouseDown={addProductToBasket} disabled={isBusketProduct}>
            {isBusketProduct ? 'в корзине' : 'в корзину'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Product;