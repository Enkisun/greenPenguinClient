import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addBasketProduct, setTotalPrice, addProductCount } from '../../redux/basketReducer'
import cn from 'classnames'
import classes from './product.module.css'

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
    <div className={classes.productWrapper}>
      <div className={classes.product}>

        <Image className={classes.image} src={product.image ? product.image.src : '/defaultImage.svg'} alt="productImage" width='180px' height='180px' />
        <p className={classes.name}>{product.name}</p>
        
        <div className={classes.info}>
          <p className={classes.price}>{product.price} руб/шт</p>
          <span className={classes.volume}>{product.volume} мл</span>
        </div>

        <div className={classes.inactiveInfo}>
          <div className={classes.counter}>
            <button className={`${classes.increment} ${classes.decrement}`} onClick={decrement} disabled={isBusketProduct}>-</button>
            <p className={classes.count}>{count}</p>
            <button className={classes.increment} onClick={increment} disabled={isBusketProduct}>+</button>
          </div>

          <button className={cn(classes.addToBasket, {[classes.insideBasket]: isBusketProduct})} 
           onMouseDown={setProductToBasket} disabled={isBusketProduct}>
            {isBusketProduct ? 'в корзине' : 'в корзину'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Product;