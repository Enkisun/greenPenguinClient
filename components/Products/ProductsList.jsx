import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts, getProducts, setCurrentPage } from '../../redux/productsReducer'
import Pagination from '../../common/Pagination'
import Preloader from '../../common/Preloader'
import Product from './Product'
import SortByItem from './SortByItem'
import styles from './productsList.module.css'

const SORT_BY = {
  price: "price",
  alphabet: "alphabet",
}

const ProductsList = () => {

  const dispatch = useDispatch();
  const { productsData, currentPage, limit, loading, sortBy, sortingOrder, searchValue } = useSelector(state => state.products);
  const { activeCategory, activeSubcategory, activeTrademarks } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(deleteProducts());
    dispatch(getProducts({currentPage, limit, activeCategory, activeSubcategory, activeTrademarks, sortBy, sortingOrder, searchValue}))
  }, [currentPage, activeCategory, activeSubcategory, activeTrademarks, sortBy, sortingOrder]);

  const onPageChanged = newCurrentPage => {
    if (!loading) {
      dispatch(setCurrentPage(newCurrentPage, limit));
    }
  }

  const items = productsData.length && productsData.map(product => (
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
        {loading && <Preloader />}
        {!loading && items.length > 0 ? items : <p>Результатов нет</p>}
      </div>

      <Pagination currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged} />
    </div>
  )
};

export default ProductsList;