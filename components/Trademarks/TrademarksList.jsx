import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrademarksTC } from '../../redux/trademarksReducer'
import Trademark from './Trademark'
import styles from './trademarksList.module.css'

const TrademarksList = () => {

  const dispatch = useDispatch();
  let { trademarks } = useSelector(state => state).trademarksReducer;

  useEffect(() => {
    dispatch(getTrademarksTC());
  }, []);

  const items = trademarks && trademarks.map(trademark => (
    <Trademark key={trademark._id} trademark={trademark.trademark} />
  ));

  return (
    <div className={styles.container}>
      <h3 className={styles.trademarksListTitle}>Бренды</h3>
      <ul className={styles.trademarksList}>
        {items}
      </ul>
    </div>
  )
}

export default TrademarksList;