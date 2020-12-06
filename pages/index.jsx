import CategoriesList from "../components/Categories/CategoriesList"
import TrademarksList from "../components/Trademarks/TrademarksList"
import ProductsList from "../components/Products/ProductsList"
import classes from '../styles/index.module.css'

const Index = () => {
  return (
    <div className={classes.container}>
      <div>
        <CategoriesList />
        <TrademarksList />
      </div>

      <ProductsList />
    </div>
  )
}

export default Index;