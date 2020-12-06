import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsTC, setCurrentPage } from '../../redux/productsReducer'
import Pagination from '../../common/Pagination'
import Preloader from '../../common/Preloader'
import Product from './Product'
import SortByItem from './SortByItem'
import classes from './productsList.module.css'

const SORT_BY = {
  'PRICE': "По цене",
  'ALPHABET': "По алфавиту",
}

const ProductsList = () => {

  const dispatch = useDispatch();
  let { products, currentPage, limit, loading, sortBy, sortingOrder, searchValue } = useSelector(state => state).productsReducer;
  let categoryFilter = useSelector(state => state.categoriesReducer.categoryFilter);
  let subcategoryFilter = useSelector(state => state.categoriesReducer.subcategoryFilter);
  let trademarkFilter = useSelector(state => state.trademarksReducer.trademarkFilter);

  useEffect(() => {
    dispatch(getProductsTC(`http://localhost:5000/api/products?page=${currentPage}&limit=${limit}&category=${categoryFilter}&subcategory=${subcategoryFilter}&trademark=${trademarkFilter}&sortBy=${sortBy}&sortingOrder=${sortingOrder}&search=${searchValue}`));
  }, [currentPage, categoryFilter, subcategoryFilter, trademarkFilter, sortBy, sortingOrder]);

  const onPageChanged = newCurrentPage => {
    (!loading) && dispatch(setCurrentPage(newCurrentPage, limit));
  }

  let sortByItems = Object.values(SORT_BY).map(el => (
    <SortByItem key={el} sortByItem={el} sortBy={sortBy} dispatch={dispatch} />
  ));

  const items = products.length && products.map(product => (
    <Product key={product._id} product={product} dispatch={dispatch} />
  ));

  return (
    <div className={classes.container}>
      <div className={classes.sortByWrapper}>
        {sortByItems}
      </div>

      <div className={classes.productWrapper}>
        {loading ? <Preloader /> : (items.length ? items : <p>Результатов нет</p>)}
      </div>

      <Pagination currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged} />
    </div>
  )
};

export default ProductsList;