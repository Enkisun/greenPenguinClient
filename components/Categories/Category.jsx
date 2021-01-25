import { useDispatch, useSelector } from 'react-redux'
import { setActiveCategory, setActiveSubcategory } from '../../redux/categoriesReducer'
import { setCurrentPage } from '../../redux/productsReducer'
import cn from 'classnames'
import styles from './category.module.css'

const CategoryList = ({ category }) => {

  const dispatch = useDispatch();
  const { activeCategory, activeSubcategory } = useSelector(state => state.categories);
  const loading = useSelector(state => state.products.loading);

  const setFilter = (category, subcategory = '') => {
    if (!loading) {
      dispatch(setActiveCategory(category));
      dispatch(setActiveSubcategory(activeCategory === category ? subcategory : ''));
      dispatch(setCurrentPage(1));
    }
  };

  const items = category.subcategories.length && category.subcategories.map(subcategory => (
    <li key={subcategory._id} className={cn(styles.subcategory, {[styles.subcategoryActive]: activeSubcategory === subcategory.name})}
     onClick={() => setFilter(category.name, subcategory.name)}>
      {subcategory.name}
    </li>
  ));

  return (
    <li>
      <p className={cn(styles.categoryTitle, {[styles.categoryTitleActive]: activeCategory === category.name})}
      onClick={() => setFilter(category.name)}>
        {category.name}
      </p>

      <ul className={cn(styles.subcategories, {[styles.subcategoriesActive]: (activeCategory === category.name && items)})}>
        {items}
      </ul>
    </li>
  )
}

export default CategoryList;