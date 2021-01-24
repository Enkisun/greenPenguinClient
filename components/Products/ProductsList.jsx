import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts, getProducts, setCurrentPage } from '../../redux/productsReducer'
import Pagination from '../../common/Pagination'
import Preloader from '../../common/Preloader'
import Product from './Product'
import SortByItem from './SortByItem'
import styles from './productsList.module.css'

const SORT_BY = {
  'PRICE': "По цене",
  'ALPHABET': "По алфавиту",
}

const ProductsList = () => {

  const dispatch = useDispatch();
  const { products, currentPage, limit, loading, sortBy, sortingOrder, searchValue } = useSelector(state => state.products);
  const { categoryFilter, subcategoryFilter, trademarkFilter } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(deleteProducts());
    dispatch(getProducts(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter, sortBy, sortingOrder, searchValue))
  }, [currentPage, categoryFilter, subcategoryFilter, trademarkFilter, sortBy, sortingOrder]);

  const onPageChanged = newCurrentPage => {
    (!loading) && dispatch(setCurrentPage(newCurrentPage, limit));
  }

  const items = products.length && products.map(product => (
    <Product key={product._id} product={product} dispatch={dispatch} />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.sortByWrapper}>
        { Object.values(SORT_BY).map(el => (
          <SortByItem key={el} sortByItem={el} sortBy={sortBy} dispatch={dispatch} />
        )) }
      </div>

      <div className={styles.productWrapper}>
        {loading ? <Preloader /> : (items.length ? items : <p>Результатов нет</p>)}
      </div>

      <Pagination currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged} />
    </div>
  )
};

export default ProductsList;