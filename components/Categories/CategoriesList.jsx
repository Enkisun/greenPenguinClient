import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/categoriesReducer'
import Category from './Category'
import styles from './categoriesList.module.css'

const CategoriesList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categoriesData = useSelector(state => state.categories.categoriesData);

  const items = categoriesData?.map(category => (
    <Category key={category._id} category={category} />
  ));

  return (
    <div className={styles.container}>
      <h3 className={styles.categoriesListTitle}>Каталог</h3>
      <ul className={styles.categoriesList}>
        {items}
      </ul>
    </div>
  )
}

export default CategoriesList;