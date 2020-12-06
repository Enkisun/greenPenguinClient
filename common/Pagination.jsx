import { useSelector } from 'react-redux'
import cn from 'classnames'
import classes from '../styles/pagination.module.css'

const Pagination = ({ currentPage, pageSize, onPageChanged, portionSize = 3 }) => {

  let { totalProductsCount } = useSelector(state => state).productsReducer;

  let pagesCount = Math.ceil(totalProductsCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) { pages.push(i); }

  let lastPage = pages[pages.length - 1];

  let leftPortionPageNumber = currentPage - Math.ceil(portionSize / 2 - 1);
  let rightPortionPageNumber = currentPage + Math.floor(portionSize / 2);

  if (currentPage === 1) rightPortionPageNumber = portionSize;
  if (currentPage === lastPage) leftPortionPageNumber = lastPage - portionSize + 1;

  let portionItems = pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber);

  let portionItem = portionItems.map(page => (
    <button key={page} className={cn(classes.pageNumber, {[classes.selectedPage]: currentPage === page})} onClick={() => onPageChanged(page)}>
      {page}
    </button>
  ));

  if (totalProductsCount <= pageSize) return <></>

  return (
    <div className={classes.paginationWrapper}>
      <button className={cn(classes.extremePages, {[classes.pageNumber]: currentPage > 1 })} onClick={() => onPageChanged(currentPage - 1)}>&lt; Назад</button>
      <button className={cn(classes.extremePages, {[classes.pageNumber]: (leftPortionPageNumber - 1) >= 1})} onClick={() => onPageChanged(1)}>1</button>
      <span className={cn(classes.extremePages, {[classes.activeDots]: (leftPortionPageNumber - 1) > 1})}>..</span>

      {portionItem}

      <span className={cn(classes.extremePages, {[classes.activeDots]: (lastPage - rightPortionPageNumber) > 1})}>..</span>
      <button className={cn(classes.extremePages, {[classes.pageNumber]: (lastPage - rightPortionPageNumber) >= 1})} onClick={() => onPageChanged(lastPage)}>{lastPage}</button>
      <button className={cn(classes.extremePages, {[classes.pageNumber]: currentPage < lastPage })} onClick={() => onPageChanged(currentPage + 1)}>Вперед &gt;</button>
    </div>
  )
}

export default Pagination;