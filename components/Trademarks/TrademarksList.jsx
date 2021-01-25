import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeActiveTrademarks } from '../../redux/categoriesReducer'
import Trademark from './Trademark'
import styles from './trademarksList.module.css'

const TrademarksList = () => {

  const [trademarks, setTrademarks] = useState();

  const dispatch = useDispatch();
  const { activeCategory, categoriesData } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(removeActiveTrademarks());

    if (activeCategory) {
      categoriesData.map(category => {
        if (category.name === activeCategory) {
          setTrademarks(category.trademarks)
        }
      })
    }
  }, [activeCategory]);

  if (!activeCategory) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.trademarksListTitle}>Бренды</h3>
      <ul className={styles.trademarksList}>
        { trademarks?.map(trademark => <Trademark key={trademark._id} trademark={trademark} />) }
      </ul>
    </div>
  )
}

export default TrademarksList;