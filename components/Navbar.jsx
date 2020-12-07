import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { removeTrademarkFilters } from '../redux/trademarksReducer'
import { setCategoryFilter, setSubcategoryFilter } from '../redux/categoriesReducer'
import { setCurrentPage, setSearchValue, setSortBy } from '../redux/productsReducer'
import cn from 'classnames'
import classes from './navbar.module.css'

export const Navbar = () => {

  let dispatch = useDispatch();
  let { searchValue, loading } = useSelector(state => state).productsReducer;
  let { basketProducts, totalPrice } = useSelector(state => state).basketReducer;
  let { categories } = useSelector(state => state).categoriesReducer;

  const getProductsWithSearch = () => {
    dispatch(removeTrademarkFilters());
    dispatch(setCategoryFilter(''));
    dispatch(setSubcategoryFilter(''));
    dispatch(setCurrentPage(1));
    dispatch(setSortBy(''));
  }

  const setFilter = e => {
    if (loading) return
    dispatch(setCategoryFilter(e.target.innerHTML));
    dispatch(setCurrentPage(1));
  }

  const onChange = e => dispatch(setSearchValue(e.target.value));

  let items = categories && categories.map((category, i) => (
    <li key={category._id} className={cn(classes.listItem, {[classes.lastItem]: i === (categories.length - 1)})} onClick={setFilter}>
      {category.category}
    </li>
  ));

  return (
    <>
      <header className={classes.header}>
        <div>
          <h3 className={classes.logo}>green penguin</h3>
          <span>магазин натуральных продуктов</span>
        </div>

        <div className={classes.searchWrapper}>
          <label htmlFor="search" className={classes.label}>
            <input type="text" id="search" placeholder="Поиск..." className={classes.search} value={searchValue} onChange={onChange} />
            
            <div className={classes.searchIconWrapper} onClick={getProductsWithSearch}>
              <Image src='/search.svg' alt='search' width='21px' height='21px' />
            </div>
          </label>
        </div>

        <div>
          <div className={classes.requestCallWrapper}>
            <p className={classes.number}>+ 375 (33) 881-76-55</p>
            <span className={classes.requestCall}>Заказать звонок</span>
          </div>

          <div className={classes.authProperties}>
            <Image src='/user.svg' alt='user' width='16px' height='16px' className={classes.authImage} />
            <a href="#" className={classes.authLink}>выйти</a>
          </div>
        </div>
      </header>

      <nav className={classes.navigation}>
        <ul className={classes.list}>
          {items}
        </ul>

        <div className={classes.basketWrapper}>
          <Link href="/basket">
            <a className={classes.basketLink}>
              <Image src='/basket.svg' alt='basket' width='36.6px' height='37.8px' className={classes.basketImage} />

              { basketProducts.length > 0 && <p className={classes.totalProducts}>{basketProducts.length}</p> }

              <div className={classes.basketInfo}>
                <span className={classes.basketText}>Корзина</span>
                <h6 className={classes.totalPrice}>{totalPrice} руб</h6>
              </div>
            </a>
          </Link>
        </div>
      </nav>
    </>
  )
}