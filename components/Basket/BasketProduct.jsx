import Image from 'next/image'
import { useDispatch } from 'react-redux'
import Counter from '../../common/Counter'
import { setTotalPrice, deleteBasketProduct, changeProductCount } from '../../redux/basketReducer'
import styles from './basketProduct.module.css'

const BasketProduct = ({ basketProduct }) => {

  const dispatch = useDispatch();

  const price = (basketProduct.count * basketProduct.price).toFixed(2);

  const decrement = () => {
    if (basketProduct.count > 1) {
      dispatch(changeProductCount({id: basketProduct.id, count: basketProduct.count - 1}));
      dispatch(setTotalPrice(-basketProduct.price));
    }
  }

  const increment = () => {
    if (basketProduct.count < 99) {
      dispatch(changeProductCount({id: basketProduct.id, count: basketProduct.count + 1}));
      dispatch(setTotalPrice(basketProduct.price));
    }
  }

  const deleteProduct = () => {
    dispatch(deleteBasketProduct(basketProduct));
    dispatch(setTotalPrice(-price));
  }

  return (
    <div className={styles.container}>
      <Image className={styles.image}
       src={basketProduct.image ? `http://localhost:5000/${basketProduct.image}` : '/defaultImage.svg'}
       alt='product_image'
       width='120px'
       height='120px'
      />

      <div className={styles.info}>
        <p className={styles.name}>{basketProduct.name}</p>
        <span className={styles.volume}>{basketProduct.price} руб/шт</span>
      </div>

      <Counter count={basketProduct.count} increment={increment} decrement={decrement} type='basket' />

      <h4 className={styles.price}>{price} руб</h4>

      <Image src='/delete.svg' alt='delete' width='17px' height='17px' className={styles.delete} onClick={deleteProduct} />
    </div>
  )
}

export default BasketProduct;