import React from 'react'
import Styles from './item-empty-styles.scss'

const StockItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.stockItemEmpty}></li>
      <li className={Styles.stockItemEmpty}></li>
      <li className={Styles.stockItemEmpty}></li>
      <li className={Styles.stockItemEmpty}></li>
    </>
  )
}

export default StockItemEmpty
