import { useSelector } from 'react-redux'
import Category from './Category'
import styles from './categoriesList.module.css'

const CategoriesList = () => {

  const categoriesData = useSelector(state => state.categories.categoriesData);

  return (
    <div className={styles.container}>
      <h3 className={styles.categoriesListTitle}>Каталог</h3>
      <ul className={styles.categoriesList}>
        { categoriesData?.map(category => (
          <Category key={category._id} category={category} />
        ))}
      </ul>
    </div>
  )
}

export default CategoriesList;