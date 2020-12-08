import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setProductCount, setTotalPrice, deleteBasketProduct, deleteProductCount } from '../../redux/basketReducer'
import styles from './basketProduct.module.css'

const BasketProduct = ({ basketProduct }) => {

  let dispatch = useDispatch();
  let { productsCount } = useSelector(state => state).basketReducer;

  let correctObject = productsCount && productsCount.find(product => product.id === basketProduct._id);
  let price = (correctObject.count * correctObject.price).toFixed(2);

  const decrement = () => {
    if (correctObject.count === 1) return;
    dispatch(setProductCount({id: basketProduct._id, count: correctObject.count - 1}));
    dispatch(setTotalPrice(-correctObject.price));
  }

  const increment = () => {
    if (correctObject.count === 99) return;
    dispatch(setProductCount({id: basketProduct._id, count: correctObject.count + 1}));
    dispatch(setTotalPrice(correctObject.price));
  }

  const deleteProduct = () => {
    dispatch(deleteBasketProduct(basketProduct));
    dispatch(deleteProductCount(basketProduct));
    dispatch(setTotalPrice(-price));
  }

  return (
    <div className={styles.container}>
      <img src={basketProduct.image ? basketProduct.image.src : '/defaultImage.svg'} alt='productImage' width='120px' height='120px' className={styles.image} />

      <div className={styles.info}>
        <p className={styles.name}>{basketProduct.name}</p>
        <span className={styles.volume}>{basketProduct.price} руб/шт</span>
      </div>

      <div className={styles.counter}>
        <span className={`${styles.increment} ${styles.decrement}`} onClick={decrement}>_</span>
        <p className={styles.count}>{correctObject.count}</p>
        <span className={styles.increment} onClick={increment}>+</span>
      </div>

      <h4 className={styles.price}>{price} руб</h4>

      <Image src='/delete.svg' alt='delete' width='17px' height='17px' className={styles.delete} onClick={deleteProduct} />
    </div>
  )
}

export default BasketProduct;