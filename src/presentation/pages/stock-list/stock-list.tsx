import Styles from './stock-list-styles.scss'
import { Header, Footer } from '@/presentation/components'
import { StockContext, StockListItem, Error } from '@/presentation/pages/stock-list/components'
import { useErrorHandler } from '@/presentation/hooks'
import { LoadStockList } from '@/domain/usecases'
import React, { useEffect, useState } from 'react'

type Props = {
  loadStockList: LoadStockList
}

const StockList: React.FC<Props> = ({ loadStockList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, error: error.message })
  })
  const [state, setState] = useState({
    stocks: [] as LoadStockList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadStockList.loadAll()
      .then(stocks => setState({ ...state, stocks }))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.stockListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>B3 - Maiores Retornos anuais</h2>
        <StockContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <StockListItem />}
        </StockContext.Provider>
      </div>
      <Footer />
    </div>
  )
}

export default StockList
