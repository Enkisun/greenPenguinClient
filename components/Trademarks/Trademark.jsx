import Image from 'next/image'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTrademark, removeActiveTrademark } from '../../redux/categoriesReducer'
import { setCurrentPage } from '../../redux/productsReducer'
import cn from 'classnames'
import styles from './trademark.module.css'

const Trademark = ({ trademark }) => {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.products.loading);
  const activeTrademarks = useSelector(state => state.categories.activeTrademarks);

  const isActive = !!activeTrademarks?.find(activeTrademark => activeTrademark === trademark.name);

  const setFilter = useCallback(() => {
    if (!loading) {
      dispatch(setCurrentPage(1));
      isActive ? dispatch(removeActiveTrademark(trademark.name)) : dispatch(setActiveTrademark(trademark.name));
    }
  }, [loading]);

  return (
    <li className={cn(styles.trademark, {[styles.trademarkActive]: isActive})} onClick={setFilter}>
      <Image className={cn(styles.check, {[styles.checkActive]: isActive})} src='/check.svg' alt='check' width='16px' height='16px' />
      <p className={styles.trademarkTitle}>{trademark.name}</p>
    </li>
  )
}

export default Trademark;