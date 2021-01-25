import { useState } from 'react'
import { setSortBy, setSortingOrder } from '../../redux/productsReducer'
import cn from 'classnames'
import styles from './sortByItem.module.css'

const SortByItem = ({ sortByItem, sortBy, dispatch }) => {

  let [arrowDirection, setArrowDirection] = useState('asc');

  const toggleSortBy = () => {
    if (sortBy !== sortByItem) {
      dispatch(setSortBy(sortByItem));
      dispatch(setSortingOrder(arrowDirection));
      return
    }
    
    setArrowDirection(arrowDirection === 'asc' ? 'desc' : 'asc');
    dispatch(setSortingOrder(arrowDirection === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <span className={cn(styles.sortBy, {[styles.sortByActive]: sortBy === sortByItem})} onClick={toggleSortBy}>
        {sortByItem === 'alphabet' ? 'По алфавиту' : 'По цене'}
      </span>
      <span className={cn(styles.arrow, {[styles.activeArrow]: sortBy === sortByItem})}>{arrowDirection === 'desc' ? '↓' : '↑'}</span>
    </>
  )
}

export default SortByItem;