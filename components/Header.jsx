import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilters, setActiveCategory, setActiveSubcategory, getCategories } from '../redux/categoriesReducer'
import { setCurrentPage, setSearchValue, setSortBy } from '../redux/productsReducer'
import cn from 'classnames'
import styles from './header.module.css'

export const Header = () => {

  const dispatch = useDispatch();
  const { searchValue, loading } = useSelector(state => state.products);
  const { basketProducts, totalPrice } = useSelector(state => state.basket);
  const categoriesData = useSelector(state => state.categories.categoriesData);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const getProductsWithSearch = () => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
    dispatch(setSortBy(''));
  }

  const setFilter = e => {
    if (!loading) {
      dispatch(setActiveCategory(e.target.innerHTML));
      dispatch(setActiveSubcategory(''));
      dispatch(setCurrentPage(1));
    }
  }

  const onChange = e => dispatch(setSearchValue(e.target.value));

  let items = categoriesData?.map((category, i) => (
    <Link href="/">
      <a>
        <li key={category._id} className={cn(styles.listItem, {[styles.lastItem]: i === (categoriesData.length - 1)})} onClick={setFilter}>
          {category.name}
        </li>
      </a>
    </Link>
  ));

  return (
    <>
      <header className={styles.header}>
        <div>
          <h3 className={styles.logo}>green penguin</h3>
          <span>магазин натуральных продуктов</span>
        </div>

        <div className={styles.searchWrapper}>
          <label htmlFor="search" className={styles.label}>
            <input type="text" id="search" placeholder="Поиск..." className={styles.search} value={searchValue} onChange={onChange} />
            
            <div className={styles.searchIconWrapper} onClick={getProductsWithSearch}>
              <Image src='/search.svg' alt='search' width='21px' height='21px' />
            </div>
          </label>
        </div>

        <div>
          <div className={styles.requestCallWrapper}>
            <p className={styles.number}>+ 375 (33) 881-76-55</p>
            <span className={styles.requestCall}>Заказать звонок</span>
          </div>

          <div className={styles.authProperties}>
            <Image src='/user.svg' alt='user' width='16px' height='16px' className={styles.authImage} />
            <a href="#" className={styles.authLink}>выйти</a>
          </div>
        </div>
      </header>

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {items}
        </ul>

        <div className={styles.basketWrapper}>
          <Link href="/basket">
            <a className={styles.basketLink}>
              <Image src='/basket.svg' alt='basket' width='36.6px' height='37.8px' className={styles.basketImage} />

              { basketProducts.length > 0 && <p className={styles.totalProducts}>{basketProducts.length}</p> }

              <div className={styles.basketInfo}>
                <span className={styles.basketText}>Корзина</span>
                <h6 className={styles.totalPrice}>{totalPrice} руб</h6>
              </div>
            </a>
          </Link>
        </div>
      </nav>
    </>
  )
}