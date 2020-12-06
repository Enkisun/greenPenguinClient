import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setProductCount, setTotalPrice, deleteBasketProduct, deleteProductCount } from '../../redux/basketReducer'
import classes from './basketProduct.module.css'

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
    <div className={classes.container}>
      <img src={basketProduct.image ? basketProduct.image.src : '/defaultImage.svg'} alt='productImage' width='120px' height='120px' className={classes.image} />

      <div className={classes.info}>
        <p className={classes.name}>{basketProduct.name}</p>
        <span className={classes.volume}>{basketProduct.price} руб/шт</span>
      </div>

      <div className={classes.counter}>
        <span className={`${classes.increment} ${classes.decrement}`} onClick={decrement}>_</span>
        <p className={classes.count}>{correctObject.count}</p>
        <span className={classes.increment} onClick={increment}>+</span>
      </div>

      <h4 className={classes.price}>{price} руб</h4>

      <Image src='/delete.svg' alt='delete' width='17px' height='17px' className={classes.delete} onClick={deleteProduct} />
    </div>
  )
}

export default BasketProduct;