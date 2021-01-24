import { useDispatch, useSelector } from 'react-redux'
import { setCategoryFilter, setSubcategoryFilter } from '../../redux/categoriesReducer'
import { setCurrentPage } from '../../redux/productsReducer'
import cn from 'classnames'
import styles from './category.module.css'

const Category = ({ category }) => {

  const dispatch = useDispatch();
  const { categoryFilter, subcategoryFilter } = useSelector(state => state.categories);
  const loading = useSelector(state => state.products.loading);

  const setFilter = (category, subcategory = '') => {
    if (loading) return
    dispatch(setCategoryFilter(category));
    dispatch(setSubcategoryFilter(categoryFilter === category ? subcategory : ''));
    dispatch(setCurrentPage(1));
  };

  const items = category.subcategory.length && category.subcategory.map(subcategory => (
    <li key={subcategory} className={cn(styles.subcategory, {[styles.subcategoryActive]: subcategoryFilter === subcategory})}
    onClick={() => setFilter(category.category, subcategory)}>
      {subcategory}
    </li>
  ));

  return (
    <li>
      <p className={cn(styles.categoryTitle, {[styles.categoryTitleActive]: categoryFilter === category.category})}
       onClick={() => setFilter(category.category)}>
        {category.category}
      </p>

      <ul className={cn(styles.subcategories, {[styles.subcategoriesActive]: (categoryFilter === category.category && items)})}>
        {items}
      </ul>
    </li>
  )
}

export default Category;