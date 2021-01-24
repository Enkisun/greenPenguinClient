import React from 'react'
import styles from './counter.module.css'
import cn from 'classnames'

const Counter = ({ count, increment, decrement, type }) => {
  return (
    <div className={cn(styles.counter, {[styles.basketCounter]: type === 'basket'})}>
      <button className={cn(styles.btn, {[styles.basketBtn]: type === 'basket', [styles.decrement]: type === 'product'})} onClick={decrement}>
        -
      </button>

      <p className={cn(styles.count, {[styles.basketCount]: type === 'basket'})}>{count}</p>

      <button className={cn(styles.btn, {[styles.basketBtn]: type === 'basket', [styles.increment]: type === 'basket'})} onClick={increment}>
        +
      </button>
    </div>
  )
}

export default Counter;