import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTrademarkFilter, removeTrademarkFilter } from '../../redux/trademarksReducer'
import { setCurrentPage } from '../../redux/productsReducer'
import cn from 'classnames'
import classes from './trademark.module.css'

const Trademark = ({ trademark }) => {

  const dispatch = useDispatch();
  let { trademarkFilter } = useSelector(state => state).trademarksReducer;
  let { loading } = useSelector(state => state).productsReducer;

  const [activeTrademark, setActiveTrademark] = useState(false);

  useEffect(() => {
    setActiveTrademark(trademarkFilter.find(trademarkFilter => trademarkFilter === trademark));
  }, [trademarkFilter]);

  const setFilter = useCallback(() => {
    if (loading) return
    setActiveTrademark(!activeTrademark);
    dispatch(setCurrentPage(1));
    activeTrademark ? dispatch(removeTrademarkFilter(trademark)) : dispatch(addTrademarkFilter(trademark));
  }, [activeTrademark, loading]);

  return (
    <li className={cn(classes.trademark, {[classes.trademarkActive]: activeTrademark})} onClick={setFilter}>
      <Image className={cn(classes.check, {[classes.checkActive]: activeTrademark})} src='/check.svg' alt='check' width='16px' height='16px' />
      <p className={classes.trademarkTitle}>{trademark}</p>
    </li>
  )
}

export default Trademark;