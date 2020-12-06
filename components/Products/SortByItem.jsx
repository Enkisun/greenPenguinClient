import { useState } from 'react'
import { setSortBy, setSortingOrder } from '../../redux/productsReducer'
import cn from 'classnames'
import classes from './sortByItem.module.css'

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
      <span className={cn(classes.sortBy, {[classes.sortByActive]: sortBy === sortByItem})} onClick={toggleSortBy}>
        {sortByItem}
      </span>
      <span className={cn(classes.arrow, {[classes.activeArrow]: sortBy === sortByItem})}>{arrowDirection === 'desc' ? '↓' : '↑'}</span>
    </>
  )
}

export default SortByItem;