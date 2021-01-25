import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addProducts, setTotalProductsCount } from '../redux/productsReducer'
import { addCategories } from '../redux/categoriesReducer'
import CategoriesList from '../components/Categories/CategoriesList'
import TrademarksList from '../components/Trademarks/TrademarksList'
import ProductsList from '../components/Products/ProductsList'
import styles from './index.module.css'

const Index = ({ productsData, categoriesData }) => {

  const { products, totalProductsCount } = productsData;
  const { categories } = categoriesData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addProducts(products));
    dispatch(setTotalProductsCount(totalProductsCount));
    dispatch(addCategories(categories));
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <CategoriesList />
        <TrademarksList />
      </div>

      <ProductsList />
    </div>
  )
}

export const getServerSideProps = async () => {
  const productsResponse = await fetch(`http://localhost:5000/products?page=${1}&limit=${12}`);
  const productsData = await productsResponse.json()

  const categoriesResponse = await fetch('http://localhost:5000/categories');
  const categoriesData = await categoriesResponse.json()

  if (!productsData || !categoriesData) {
    return {
      notFound: true,
    }
  }

  return { props: {productsData, categoriesData} };
}

export default Index;