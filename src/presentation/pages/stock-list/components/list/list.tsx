import Styles from './list-styles.scss'
import { LoadStockList } from '@/domain/usecases'
import { StockItem, StockItemEmpty, StockContext } from '@/presentation/pages/stock-list/components'
import React, { useContext } from 'react'

const List: React.FC = () => {
  const { state } = useContext(StockContext)
  return (
    <ul className={Styles.listWrap} data-testid="stock-list">
      {state.stocks.length
        ? state.stocks.map((stock: LoadStockList.Model) => <StockItem key={stock.id} stock={stock} />)
        : <StockItemEmpty />
      }
    </ul>
  )
}

export default List
